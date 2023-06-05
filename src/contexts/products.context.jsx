import { createContext, useState, useEffect, useContext } from "react";
import { getProductsAndDocuments } from "../utils/firebase/firebase.utils";
import { CategoriesContext } from "./categories.context";

export const ProductsContext = createContext({
    setProductsMap: () => null,
    getProductsOrderByCategory: () => null,
    products: null    
});

export const ProductsProvider = ({children}) => {
    const [productsCol, setProductsCol] = useState(null);
    const { categoriesCol } = useContext(CategoriesContext);

    useEffect(()=>{
        console.log("PRODUCTS BEGIN");
        const getProductCol = async () => {
            const productCol = await getProductsAndDocuments();
            console.log("GETPRDCUTS...", productCol);
            setProductsCol(productCol); 
        };
    
        getProductCol();
        console.log("PRODUCTS END");
    },[]);

    const getProductsOrderByCategory = () => {
        console.log( "CATEGORIES:", categoriesCol);
        if( !categoriesCol ) return productsCol;
        const orderedProducts = categoriesCol.sort((a,b)=>a.order-b.order).reduce((acc, category)=>{
            productsCol.filter(product=>product.category.toUpperCase() === category.name.toUpperCase())
                .map((product)=>{
                    console.log("PUSH:", product);
                    acc.push(product);
                });
            return acc;
        },[]);
        console.log("ORDERER:", orderedProducts);
        return orderedProducts;
    }

    const value = {
        productsCol, 
        setProductsCol, 
        getProductsOrderByCategory
    };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};