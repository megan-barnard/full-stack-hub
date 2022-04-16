"use strict";

const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const arrayUnion = admin.firestore.FieldValue.arrayUnion; 
const timestamp = admin.firestore.FieldValue.serverTimestamp;
const documentId = admin.firestore.FieldPath.documentId;
var serviceAccount = require("./serviceAccountKey.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://full-stack-hub-social-media-default-rtdb.firebaseio.com"
});
const auth = getAuth(app);
const db = admin.firestore();

module.exports = {
  auth,
  db,
  arrayUnion,
  timestamp,
  documentId 
};
