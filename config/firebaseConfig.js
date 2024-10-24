var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brain-update-20a9b-default-rtdb.firebaseio.com",

});

// Sử dụng Firestore database (nếu bạn đang dùng Firestore)
const db = admin.firestore();

// Nếu sử dụng Realtime Database, có thể thêm một dòng để xuất ra DB cho Realtime Database như sau:
// const realTimeDb = admin.database();

// Xuất biến db để có thể sử dụng trong các file khác
module.exports = { db };
