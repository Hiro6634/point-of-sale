import { createContext, useState, useEffect } from "react";
import { getProductsAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
    productsCol: null,
    updateCounters: () => {}    
});

export const ProductsProvider = ({children}) => {
    const [productsCol, setProductsCol] = useState(null);

    useEffect(()=>{
        const getProductCol = async () => {
            const productCol = await getProductsAndDocuments();
            setProductsCol(productCol); 
        };
        getProductCol();
    },[]);

    const updateCounters = (product, itemSaled ) => {

    };
    const value = {
        productsCol,
        updateCounters 
    };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};