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
    getDocs,
    setDoc,
    collection,
    query,
    onSnapshot
} from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyB_vEdLMXk3Fh649VwaLvg7iWCbwx0Jx08",
//     authDomain: "ajbpos.firebaseapp.com",
//     databaseURL: "https://ajbpos-default-rtdb.firebaseio.com",
//     projectId: "ajbpos",
//     storageBucket: "ajbpos.appspot.com",
//     messagingSenderId: "955048515609",
//     appId: "1:955048515609:web:01ad37f2cdcbf4016f7288",
//     measurementId: "G-F0RFSFCFP6"
// };
const firebaseConfig = {
    apiKey: "AIzaSyAX-qkALEtk-Vxdd-4bwU5gXundlcwFGwk",
    authDomain: "pointofsale-ae0fd.firebaseapp.com",
    projectId: "pointofsale-ae0fd",
    storageBucket: "pointofsale-ae0fd.appspot.com",
    messagingSenderId: "855078399227",
    appId: "1:855078399227:web:83d784b43ab9385154145e",
    measurementId: "G-1RSNNYZ9XE"
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
        const printer = "PRN1";
        const enablePrinter = false;

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                printer,
                enablePrinter,
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

// Being deprecate
export const getProductsAndDocuments = async () => {
    const collectionRef = collection(db, 'products');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const productCol = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        acc.push({
            quantity: 0,
            subtotal: 0,
            ...docSnapshot.data()
        });
        return acc;
    },[]);
    return productCol;
};

// export const onProductsChangedListener = (callback) => {
//     const collectionRef = collection(db, 'products');
//     // const q = query(collectionRef);
    
//     onSnapshot(collectionRef, (querySnapshot)=>{
//         const productCol = querySnapshot.docs.reduce((acc, docSnapshot)=>{
//             acc.push({
//                 quantity: 0,
//                 subtotal: 0,
//                 ...docSnapshot.data()
//             });
//             return acc;
//         },[]);
//         callback(productCol);
//     });
// }

export const updateStock = async (productid, units, sale) => {
    try{
        const stockRef = collection(db, "stock").doc(productid.toLowerCase());

        await db.runTransaction( async (transaction)=>{
            const stockSnapshot = await transaction.get(stockRef);
            const currentStock = stockSnapshot.data();
            const {stock, sales } = currentStock;
            
            const updatedStock = {
                ...currentStock,
                stock: stock - units,
                sales: sales + sale
            };

            transaction.update(stockRef, updatedStock);
        });

        console.log("Item Updated");
    } catch(error){
            console.error('Updating error: ', error);
    }
}  

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const categoryCol = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        acc.push(docSnapshot.data());
        return acc;
    },[]);
    return categoryCol;
}

export const onCategoriesUpdatedListener = (callback) => {
    const collectionRef = collection(db, 'categories');
    onSnapshot( collectionRef, (querySnapshot) =>{
        const categoryCol = querySnapshot.docs.reduce((acc,docSnapshot)=>{
            acc.push(docSnapshot.data());
            return acc;
        },[]);
        callback(categoryCol);
    });
}


export const printTicket = async (printer, ticket) => {
    const ticketId = new Date().getTime();
    const printerCollection = db.collection('printers');

    try{
        await printerCollection.doc(`printers/${printer}/queue/${ticketId}`).set(ticket);
    } catch(error){
        console.error(error);     
    } 
}

export const decCounter = async (productId, quantity) => {
    try{
        const productsRef = collection(db,'products');
        const productRef = productsRef.doc(productId.toLowerCase())
        await db.runTransaction(async(transaction) => {
            const productDoc = await transaction.get(productRef);
            if( productDoc.exists ){
                const {name, stock, price, sales, unitsPerSale } = productDoc.data();
                console.log("PRODUCT " + name + " QTY: " + quantity);
                const newStock = stock - (quantity * unitsPerSale);
                const newSales = sales ? sales : 0 + quantity * price;

                transaction.update( productRef, {
                    stock: newStock,
                    sales: newSales
                });
            }
        });
        console.log("Product " + productId + " updated successfully");
    }catch(error){
        console.log('Fail to update counter ', error);
    }
}
export const getCollectionAndDocuments = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const collectionMap = querySnapshot.docs.reduce((acc, docSnapshot)=> {
        acc.push(docSnapshot.data());
        return acc;
    }, []); 

    return collectionMap;
}

const getProductsSortByCategory = async (querySnapshot) => {
    const unordererProductMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        acc.push(docSnapshot.data());
        return acc;
    }, []);

    const categoryMap = await getCollectionAndDocuments("categories");
    if( categoryMap === undefined || categoryMap.length === 0)
        return unordererProductMap;

    const productsMap = categoryMap.sort((a,b)=>a.order-b.order).reduce((acc, category)=>{
        unordererProductMap.filter(product=>product.category.toLowerCase() === category.name.toLowerCase()).map(product=>{
            if(product.enable){
                acc.push({
                    color: category.color,
                    ...product
                });
            } 
            return acc;
        });
        return acc;
    },[]);
    return productsMap; 
}

export const getProductsOrderedByCategory = async () =>{
    const productsRef = collection( db, "products");
    const qry = query(productsRef);
    const querySnapshot = await getDocs(qry);

    return getProductsSortByCategory(querySnapshot);
}

export const onProductsChangedListener = (callback) => {
    const productsRef = collection( db, "products");
    
    onSnapshot( productsRef, async (querySnapshot) =>{
        callback(await getProductsSortByCategory(querySnapshot));
    });
 }