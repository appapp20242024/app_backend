// config/firebaseConfig.js
require('dotenv').config();
const admin = require('firebase-admin');

// Kiểm tra biến GOOGLE_CREDENTIALS
if (!process.env.GOOGLE_CREDENTIALS) {
  console.error('GOOGLE_CREDENTIALS not defined in .env');
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brain-update-20a9b-default-rtdb.firebaseio.com"});
const auth = admin.auth();

const db = admin.firestore();
module.exports = { db, admin,auth };
