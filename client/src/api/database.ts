import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, getDocs, query, collection, where, limit } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { orderBy } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB5kpoligfLNJcamn2oO7tJWVt-L0yg_2g",
	authDomain: "sound-country-402719.firebaseapp.com",
	projectId: "sound-country-402719",
	storageBucket: "sound-country-402719.appspot.com",
	messagingSenderId: "705094952507",
	appId: "1:705094952507:web:bf2da91b5867238380de1e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

async function getWorkers() {
    console.log("getWorkers");

	const res = await signInWithEmailAndPassword(
		auth,
		"webui@m.evermiss.net",
		"NSSs@KJUucWAYkd9"
	)
		.then(async (userCredential) => {
			// const user = userCredential.user;
			const employees = collection(db, "employees");

			const q = query(employees);
			const docs = await getDocs(q);
			const res = [];

			docs.forEach((doc) => {
				res.push(doc.data());
			});

			return res;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			return errorCode + ": " + errorMessage;
		});

	return res;
}

async function getEnergy(employeeID: any) {
    console.log("getEnergy");

    const res = await signInWithEmailAndPassword(
		auth,
		"webui@m.evermiss.net",
		"NSSs@KJUucWAYkd9"
	)
		.then(async (userCredential) => {
        
            const energyCollection = collection(db, "energy");

            const q = query(energyCollection, where("employee", "==", employee));
            const energies = await getDocs(q);
            const res = [];

            console.log(energies);

			energies.forEach((doc) => {
                console.log(energies.data());
				res.push(energies.data());
			});

            
            res.sort((a,b) => a.timestamp - b.timestamp); // b - a for reverse sort
            
            console.log(res);

			return res[0];
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;

			return errorCode + ": " + errorMessage;
		});

	return res;
}

export { getWorkers, getEnergy };
