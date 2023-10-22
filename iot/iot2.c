const functions = require('@google-cloud/functions-framework');
const {Firestore} = require('@google-cloud/firestore');

// Create a new client
const firestore = new Firestore({
  apiKey: "AIzaSyB5kpoligfLNJcamn2oO7tJWVt-L0yg_2g",
  authDomain: "sound-country-402719.firebaseapp.com",
  projectId: "sound-country-402719",
  storageBucket: "sound-country-402719.appspot.com",
  messagingSenderId: "705094952507",
  appId: "1:705094952507:web:bf2da91b5867238380de1e"
});

async function energyUpdater() {
  try {
    // Fetch data from the "sensor_data" collection.
    const sensorDataCollection = await firestore.collection('sensor_data').where('ingested', '==', false);

    const querySnapshot = await sensorDataCollection.get();

    for (const docRef of querySnapshot.docs) {
      const data = docRef.data();
      const employeeRef = await data.employee.get();
      const employeeData = employeeRef.data();

      let fatigueRate = 1;

      let count = 0;
      let avg = 0;
      for (const tmp of data.readings) {
        avg += tmp.temperature;
        count++;
      } 
      avg /= count;

      if (avg >= 40) {
        fatigueRate = 1
      } else {
        fatigueRate = 0.5
      }

      await employeeRef.set({
        fatigueRate
      }, { merge: true })

      await docRef.set({
        ingested: true
      }, { merge: true })
    }

    // Create a new document in the "energy" collection with the aggregated data.
    const energyCollection = firestore.collection('energy');
    const newDocRef = await energyCollection.add({ data: energyData });

    return {
      success: true,
      message: `Data written to 'energy' collection with ID: ${newDocRef.id}`,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error processing data: ' + error.message,
    };
  }
}

functions.http('helloHttp', async (req, res) => {
  const result = await energyUpdater();
  res.json(result);
});