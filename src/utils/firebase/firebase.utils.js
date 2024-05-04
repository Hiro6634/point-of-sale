
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';

import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

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

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
      var {displayName, email} = userAuth;
      const createAt = new Date();
      try{
          if( displayName == null ){
              displayName = email.split("@")[0];
          }
          
          await setDoc(userDocRef, {
              displayName,
              email,
              createAt
          });
      }catch(error){
          console.log('error creating the user ', error.message);
      }
  }

  return userDocRef;
}
