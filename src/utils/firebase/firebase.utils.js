
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  GoogleAuthProvider,
  getAuth
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX-qkALEtk-Vxdd-4bwU5gXundlcwFGwk",
  authDomain: "pointofsale-ae0fd.firebaseapp.com",
  projectId: "pointofsale-ae0fd",
  storageBucket: "pointofsale-ae0fd.appspot.com",
  messagingSenderId: "855078399227",
  appId: "1:855078399227:web:e39ec1b4b5c176f554145e",
  measurementId: "G-05F4732EMR"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
