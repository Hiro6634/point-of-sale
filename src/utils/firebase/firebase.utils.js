import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB_vEdLMXk3Fh649VwaLvg7iWCbwx0Jx08",
    authDomain: "ajbpos.firebaseapp.com",
    databaseURL: "https://ajbpos-default-rtdb.firebaseio.com",
    projectId: "ajbpos",
    storageBucket: "ajbpos.appspot.com",
    messagingSenderId: "955048515609",
    appId: "1:955048515609:web:01ad37f2cdcbf4016f7288",
    measurementId: "G-F0RFSFCFP6"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if( !userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation,
            });
        } catch(error){
            console.log('Error creating the user ', error.message);
        }
    }

    return userDocRef;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword( auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);