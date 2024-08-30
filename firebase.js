import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNDDlKIM_xYnSo8Djntaqai5-gGe4KLAE",
  authDomain: "kaykoo-25b27.firebaseapp.com",
  projectId: "kaykoo-25b27",
  storageBucket: "kaykoo-25b27.appspot.com",
  messagingSenderId: "1072509460988",
  appId: "1:1072509460988:web:50e1f172f19ca21e18d279",
  measurementId: "G-VTH8MQ0VSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Realtime Database and get a reference to the service
const database = getDatabase(app);
const firestore = getFirestore(app);
const db = getFirestore(app);


export { auth, database, firestore, db };
