import { createContext, useEffect } from "react";

export const ProductContext = createContext({
    products: []
});

const PRODUCT_ACTION_TYPES = {
    SET_PRODUCTS: 'SET_PRODUCTS',
}

const INITAL_STATE = {
    products: [],
}

const productReducer = (state, action) => {
    const { type, payload } = action;
    switch(type){
        case PRODUCT_ACTION_TYPES.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        default:
            throw new Error(`unhandled type of ${type} in productsReducer`);
    }
}

useEffect(()=>{
    const productsMap = [{
        id: 1
    }];
}, []);
