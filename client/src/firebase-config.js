import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBR7131vU5JSD8XZYNUkpDttZln0D_tFU4",
  authDomain: "full-stack-hub-social-media.firebaseapp.com",
  databaseURL: "https://full-stack-hub-social-media-default-rtdb.firebaseio.com",
  projectId: "full-stack-hub-social-media",
  storageBucket: "full-stack-hub-social-media.appspot.com",
  messagingSenderId: "831007868963",
  appId: "1:831007868963:web:e06772f65b2f22085a4996",
  measurementId: "G-74JCJXVFC7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);
