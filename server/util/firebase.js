"use strict";
require('dotenv').config();
const { FIREBASE_ADMIN_PRIVATE_KEY_ID, FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_CLIENT_ID, FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL, FIREBASE_ADMIN_CLIENT_X509_CERT_URL } = process.env;
const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const arrayUnion = admin.firestore.FieldValue.arrayUnion; 
const timestamp = admin.firestore.FieldValue.serverTimestamp;
const documentId = admin.firestore.FieldPath.documentId;
const serviceAccount = {
  "type": "service_account",  
  "project_id": "full-stack-hub-social-media",
  "private_key_id": FIREBASE_ADMIN_PRIVATE_KEY_ID,
  "private_key": FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": FIREBASE_ADMIN_CLIENT_EMAIL,
  "client_id": FIREBASE_ADMIN_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": FIREBASE_ADMIN_CLIENT_X509_CERT_URL 
};

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
