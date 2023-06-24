import { createContext, useEffect, useReducer, useContext } from "react";
import { onProductsChangedListener } from "../utils/firebase/firebase.utils";
import productsReducer, { initialState, ProductsActionType } from "./products.reducer";
import useCategories from "./categories.context";
import { signInWithEmailAndPassword } from "firebase/auth";

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({children}) => {
    const [state, dispatch] = useReducer( productsReducer, initialState);
    const {orderedCategories} = useCategories();

    const setProducts = (products) =>{
        const localProd = products;
        dispatch({
            type: ProductsActionType.SET_PRODUCTS_COL,
            payload: localProd
       });
    }

    const getProductsOrderedByCategory = () => {
        const sortedList = orderedCategories.reduce((acc, category)=>{
            state.productCol.filter(product=>product.category.toUpperCase() === category.name.toUpperCase())
                .map(product=>{
                    if( product.enable){
                        acc.push({
                            color: category.color,
                            ...product
                        });
                    }
                    return acc;
                })
                return acc;
        },[]); 
        return sortedList;
    }

    const updateCounters = (product, itemSaled ) => {
        console.log(product+ " " + itemSaled);
    };

    useEffect( ()=>{
        onProductsChangedListener((productCol)=>{
            setProducts(productCol);
        });
    },[]);

    const value = {
        productsCol: state.productsCol,
        getProductsOrderedByCategory,
        updateCounters 
    };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

const useProducts = () => {
    const context = useContext(ProductsContext);

    if( context === undefined){
        throw new Error("useProducts must be used within ProductsContext");
    }

    return context;
}

export default useProducts;