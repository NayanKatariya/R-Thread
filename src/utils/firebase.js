// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVlGCwhWh1RRQBSdoy3dUjCDdX9fVb5Ks",
  authDomain: "relay-ai-7b3ce.firebaseapp.com",
  projectId: "relay-ai-7b3ce",
  storageBucket: "relay-ai-7b3ce.firebasestorage.app",
  messagingSenderId: "104072870053",
  appId: "1:104072870053:web:fdbceefc8ec4ac9a40354c",
  measurementId: "G-2D7PZ54BTJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export {auth}