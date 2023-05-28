import { createContext, useState, useEffect } from "react";
import { getProductsAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
    productsMap: {},
});

export const ProductsProvider = ({children}) => {
    const [productsMap, setProductsMap] = useState({});

    useEffect(()=>{
        const getProductMap = async () => {
            const productMap = await getProductsAndDocuments();
            setProductsMap(productMap);
        };

        getProductMap();
    }, []);

    const value = {productsMap};

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};