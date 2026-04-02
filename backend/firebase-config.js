const admin = require('firebase-admin');

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Used when deploying to platforms like Render where you provide the JSON string as an env variable
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin initialized with custom JSON.');
  } else {
    // Relies on GOOGLE_APPLICATION_CREDENTIALS path
    admin.initializeApp();
    console.log('Firebase Admin initialized successfully using default path.');
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error.stack);
}

module.exports = admin;
