
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
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

export const db = getFirestore();

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

export const getUserDocumentFromUid = async(uid) => {
  console.log("getUserDocumentFromUid:" + uid);
  const userDocRef = doc(db, 'users', uid);

  console.log("userDocRef:", userDocRef);
  const userDocSnap = await getDoc(userDocRef);
  if( userDocSnap.exists()){

    console.log("UserDOC:", userDocSnap.data(), userDocSnap.data().displayName  );
    return userDocSnap.data();
  }
  else {
    console.log("MISSING DOC");
  }
  return null;  
}

export const  signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const getCategories = async ()  => {
  const categoriesRef = collection(db, 'categories');
  const q = query(categoriesRef);

  const querySnapshot = await getDocs(q);
  const categoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    acc.push(docSnapshot.data());
    return acc;
  },[]);
  return categoriesMap;
}

const getProductsSortByCategory = async (querySnapshot) => {
  const unorderedProductsMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    acc.push(docSnapshot.data());
    return acc;
  },[]);

  const categoriesMap = await getCategories();
  if( categoriesMap === undefined || categoriesMap.length === 0)
    return unorderedProductsMap;

  const productsMap = categoriesMap.sort((a,b)=>a.order-b.order).reduce((acc, category) => {
    unorderedProductsMap.filter(product => product.category.toLowerCase() === category.name.toLowerCase()).map(product=>{
      acc.push({
        color: category.color,
        ...product
      });
      return acc;
    });
    return acc;
  },[]);
  return productsMap;
}

export const getProductsOrdererByCategory = async () => {
  const productsRef = collection( db, 'products');
  const q = query(productsRef);
  const querySnapshot = await getDocs(q);

  return getProductsSortByCategory(querySnapshot);
}

export const onProductsChangedListener = (callback) => {
  const productsRef = collection( db, 'products');

  onSnapshot( productsRef, async(querySnapshot) =>{
    callback( await getProductsSortByCategory(querySnapshot));
  });
}