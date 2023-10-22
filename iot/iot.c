#include <Wire.h>
#include "MMA7660.h"

#include <math.h>

const int B = 4275;           // B value of the thermistor
const int R0 = 100000;        // R0 = 100k
const int pinTempSensor = A0; // Grove - Temperature Sensor connect to A0

#include "UUID.h"

#include <Arduino.h>
#if defined(ESP32) || defined(ARDUINO_RASPBERRY_PI_PICO_W)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#elif __has_include(<WiFiNINA.h>)
#include <WiFiNINA.h>
#elif __has_include(<WiFi101.h>)
#include <WiFi101.h>
#elif __has_include(<WiFiS3.h>)
#include <WiFiS3.h>
#endif

#include <Firebase_ESP_Client.h>

// Provide the token generation process info.
#include <addons/TokenHelper.h>

/* 1. Define the WiFi credentials */
#define WIFI_SSID "Galaxy Spot"
#define WIFI_PASSWORD "KristenIsPompous"

/* 2. Define the API Key */
// hidden

/* 3. Define the project ID */
#define FIREBASE_PROJECT_ID "sound-country-402719"

/* 4. Define the user Email and password that alreadey registerd or added in your project */
//  hidden 

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long dataMillis = 0, sensorMillis = 0;

#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
WiFiMulti multi;
#endif

struct accel_pos
{
    int8_t x, y, z;
};

struct accel_accel
{
    float x, y, z;
};

struct reading
{
    struct accel_accel accel;
    struct accel_pos pos;
    double temperature;
};

#define READINGS_NUM 15
int readings_i = 0;
bool readings_upload_ready = false;
struct reading readings[READINGS_NUM] = {};

// The Firestore payload upload callback function
void fcsUploadCallback(CFS_UploadStatusInfo info)
{
    if (info.status == firebase_cfs_upload_status_init)
    {
        Serial.printf("\nUploading data (%d)...\n", info.size);
    }
    else if (info.status == firebase_cfs_upload_status_upload)
    {
        Serial.printf("Uploaded %d%s\n", (int)info.progress, "%");
    }
    else if (info.status == firebase_cfs_upload_status_complete)
    {
        Serial.println("Upload completed ");
    }
    else if (info.status == firebase_cfs_upload_status_process_response)
    {
        Serial.print("Processing the response... ");
    }
    else if (info.status == firebase_cfs_upload_status_error)
    {
        Serial.printf("Upload failed, %s\n", info.errorMsg.c_str());
    }
}

UUID uuid;
MMA7660 accelemeter;

void setup()
{

    Serial.begin(115200);

    uuid.seed(analogRead(A3), analogRead(A6));

    accelemeter.init();

#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
    multi.addAP(WIFI_SSID, WIFI_PASSWORD);
    multi.run();
#else
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
#endif

    Serial.print("Connecting to Wi-Fi");
    unsigned long ms = millis();
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
        if (millis() - ms > 10000)
            break;
#endif
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

    /* Assign the api key (required) */
    config.api_key = API_KEY;

    /* Assign the user sign in credentials */
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;

    // The WiFi credentials are required for Pico W
    // due to it does not have reconnect feature.
#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
    config.wifi.clearAP();
    config.wifi.addAP(WIFI_SSID, WIFI_PASSWORD);
#endif

    /* Assign the callback function for the long running token generation task */
    config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

    // Comment or pass false value when WiFi reconnection will control by your code or third party library e.g. WiFiManager
    Firebase.reconnectNetwork(true);

    // Since v4.4.x, BearSSL engine was used, the SSL buffer need to be set.
    // Large data transmission may require larger RX buffer, otherwise connection issue or data read time out can be occurred.
    fbdo.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);

    // Limit the size of response payload to be collected in FirebaseData
    fbdo.setResponseSize(2048);

    Firebase.begin(&config, &auth);

    // For sending payload callback
    // config.cfs.upload_callback = fcsUploadCallback;

    // You can use TCP KeepAlive in FirebaseData object and tracking the server connection status, please read this for detail.
    // https://github.com/mobizt/Firebase-ESP-Client#about-firebasedata-object
    // fbdo.keepAlive(5, 5, 1);
}

void loop()
{
    if ((millis() - sensorMillis > 250 || sensorMillis == 0) && !readings_upload_ready)
    {
        sensorMillis = millis();

        // get accel data
        int8_t x;
        int8_t y;
        int8_t z;
        float ax, ay, az;
        accelemeter.getXYZ(&x, &y, &z);
        accelemeter.getAcceleration(&ax, &ay, &az);

        // get tmp data
        int a = analogRead(pinTempSensor);
        double R = 1023.0 / a + 0.5;

        R = R0 * R;

        double temperature = 1.0 / (log(R / R0) / B + 1 / 298.15) - 273.15; // convert to temperature via datasheet

        readings[readings_i++] = {
            {ax, ay, az},
            {x, y, z},
            temperature};

        if (readings_i >= READINGS_NUM)
        {
            readings_i = 0;
            readings_upload_ready = true;
        }
    }
    // Firebase.ready() should be called repeatedly to handle authentication tasks.

    if (Firebase.ready() && readings_upload_ready)
    {
        readings_upload_ready = false;
        FirebaseJson content;

        uuid.generate();
        String documentPath = "sensor_data/" + String(uuid.toCharArray());

        for (int i = 0; i < READINGS_NUM; i++)
        {
            char idx[10];
            sprintf(idx, "%d", i);
            content.set("fields/readings/arrayValue/values/[" + String(idx) + "]/mapValue/fields/temperature/doubleValue", readings[i].temperature);

            content.set("fields/readings/arrayValue/values/[" + String(idx) + "]/mapValue/fields/accelerometer/mapValue/fields/position/mapValue/fields/x/integerValue", readings[i].pos.x);
            content.set("fields/readings/arrayValue/values/[" + String(idx) + "]/mapValue/fields/accelerometer/mapValue/fields/position/mapValue/fields/y/integerValue", readings[i].pos.y);
            content.set("fields/readings/arrayValue/values/[" + String(idx) + "]/mapValue/fields/accelerometer/mapValue/fields/position/mapValue/fields/z/integerValue", readings[i].pos.z);

            content.set("fields/readings/arrayValue/values/[" + String(idx) + "]/mapValue/fields/accelerometer/mapValue/fields/acceleration/mapValue/fields/x/doubleValue", readings[i].accel.x);
            content.set("fields/readings/arrayValue/values/[" + String(idx) + "]/mapValue/fields/accelerometer/mapValue/fields/acceleration/mapValue/fields/y/doubleValue", readings[i].accel.y);
            content.set("fields/readings/arrayValue/values/[" + String(idx) + "]/mapValue/fields/accelerometer/mapValue/fields/acceleration/mapValue/fields/z/doubleValue", readings[i].accel.z);

            readings[i] = {};
        }

        String site_path = "projects/" + String(FIREBASE_PROJECT_ID) + "/databases/(default)/documents/sites/70fBpQiYSW4BoMVZjxft";
        content.set("fields/site/referenceValue", site_path);

        String employee_path = "projects/" + String(FIREBASE_PROJECT_ID) + "/databases/(default)/documents/employees/g2nqJhvLOjD04NznLj26";
        content.set("fields/employee/referenceValue", employee_path);

        content.set("fields/ingested/booleanValue", false);

        Serial.print("Creating a document... ");

        if (Firebase.Firestore.createDocument(&fbdo, FIREBASE_PROJECT_ID, "" /* databaseId can be (default) or empty */, documentPath.c_str(), content.raw()))
            Serial.printf("ok");
        else
            Serial.printf("bad\n%s\n\n", fbdo.payload().c_str());
        Serial.println(fbdo.errorReason());
    }
}