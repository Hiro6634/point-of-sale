import { createContext, useState, useEffect } from "react";
import { getProductsAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
    setProductsMap: () => null,
    products: 
    null    
});

export const ProductsProvider = ({children}) => {
    const [productsCol, setProductsCol] = useState(null);
    const value = {productsCol, setProductsCol};

    useEffect(()=>{
        const getProductCol = async () => {
            const productCol = await getProductsAndDocuments();
            setProductsCol(productCol); 
        };
    
        getProductCol();
    },[]);

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};