import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Mutex, withTimeout, E_TIMEOUT } from 'async-mutex';


const config = {
    apiKey: "AIzaSyB_vEdLMXk3Fh649VwaLvg7iWCbwx0Jx08",
    authDomain: "ajbpos.firebaseapp.com",
    projectId: "ajbpos",
    storageBucket: "ajbpos.appspot.com",
    messagingSenderId: "955048515609",
    appId: "1:955048515609:web:01ad37f2cdcbf4016f7288",
    measurementId: "G-F0RFSFCFP6"
  };


  var app = firebase.initializeApp(config);
  
  
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if( !userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();       
        const printer = '';

       if(!snapShot.exists){
           const {displayName, email} = userAuth;
           const createAt = new Date();

           try {
               await userRef.set({
                   displayName,
                   email,
                   printer,
                   createAt,
                   ...additionalData
               })
           } catch(error){
               console.log('error creating user ', error.message);
           }
       }

       return userRef;
  }

export const printTicket = async (printer, ticket) => {
    const ticketId = new Date().getTime();
    const queueRef = firestore.doc(`printers/${printer}/queue/${ticketId}`);
    
    try{
        await queueRef.set(
            ticket
        );
    } catch(error){
        console.error(error);     
    } 
}


    export const updateStock = async (product, quantity) => {
        let dbLock = withTimeout(new Mutex(), 100);
        let release = await dbLock.acquire()
        //const batch = firestore.batch();
        const stockRef = firestore.collection('products').doc(product.toLowerCase());
        try{
//            stockRef.update({stock: firebase.firestore.FieldValue(-1)});

            const stockDoc = await stockRef.get();
            if( stockDoc.exists){
                const {name, enable, stock, enablestop, stoplevel, price, sales} = stockDoc.data();
                
                console.log("PRODUCT " + name + " QTY:" + quantity);
                const newStock = stock - quantity;
                const newSales = sales ? sales : 0 + quantity * price;
                console.log("PRODUCT " + name + " SALES:" + newSales);
                var newEnable = enable;
                if( enablestop && stock <= stoplevel ){
                    newEnable = false;
                }                

                stockRef.set({
                    ...stockDoc.data(),
                    stock: newStock,
                    enable: newEnable,
                    sales: newSales
                })
            }
      } catch(error){
            console.log("ERROR", error);
            if( error === E_TIMEOUT){
                console.log("REVERSE OPERATION");
            }
            //batch.delete();
        } finally {
            //batch.commit();
            release();
        }

        return true;
    }

  export const convertCollectionSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc=>{
        const {name, category, price, enable, stock, warninglevel, stoplevel, enablestop, sales} = doc.data();
        return {
            id: doc.id,
            name,
            price,
            category,
            enable,
            stock,
            warninglevel,
            stoplevel,
            enablestop,
            sales
        };
    });

    return transformedCollection.reduce((accumulator, collection)=>{
        accumulator[collection.name.toLowerCase()] = collection;
        return accumulator;
    }, {});
  }
  export const convertCategorySnapshotToMap = categories => {
    const transformedCategories = categories.docs.map(doc=>{
        const {order, name, color} = doc.data();

        return{
            id: doc.id,
            order,
            name,
            color
        };
    });   
    
    return transformedCategories.reduce((accumulator, category)=>{
        accumulator[category.name.toLowerCase()] = category;
        return accumulator;
    },{});
  }

  export const auth = firebase.auth(app);
  export const firestore = firebase.firestore();
  
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup( provider);

  export default firebase;


