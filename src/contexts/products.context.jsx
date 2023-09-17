import { createContext, useEffect, useReducer, useContext } from "react";

import { getProductsOrderedByCategory, onProductsChangedListener } from "../utils/firebase/firebase.utils";

import useCategories from "./categories.context";

import { createAction } from "../utils/reducer/reducer.utils";

const INITIAL_STATE = {
    products: []
};

export const ProductsContext = createContext(INITIAL_STATE);

const PRODUCTS_ACTION_TYPES = {
    SET_PRODUCTS: 'SET_PRODUCTS'
};

const productsReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        default:
            throw new Error(`unhandled type of ${type} in productsReducer`);

    }
};

export const ProductsProvider = ({children}) => {
    const [{products}, dispatch] = useReducer( productsReducer, INITIAL_STATE);
    const {categories} = useCategories();

    const setProducts = (products) => {
        dispatch(createAction(PRODUCTS_ACTION_TYPES.SET_PRODUCTS, products));
    }

    const updateStock = (productId, itemSaled ) => {
        const product = products.find(item=>item.id === productId);
        const saleUnit = {
            productId,
            items: itemSaled * product.unitsPerSale,
            sale: itemSaled * product.price
        }
        console.log(JSON.stringify(saleUnit, null,2));
    };

    useEffect(()=>{
        onProductsChangedListener((productsMap)=>{
            setProducts(productsMap);
        });
    },[]);

    // Recargo los productos si hubo un cambio en las categorias
    useEffect( ()=>{
        async function loadProducts(){
            try{
                const products = await getProductsOrderedByCategory();

                setProducts(products);
            } catch(error){
                console.error(error);
            }
        }
        loadProducts();
    },[categories]);

    const value = {
        products,
        updateStock
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