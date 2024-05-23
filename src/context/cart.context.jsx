import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer.utils";

export const CartContext = createContext({
    cart:[],
    hide: true
});

const CART_ACTION_TYPES = {
    ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
    CLEAR_CART: 'CLEAR_CART',
    SHOW_CART: 'SHOW_CART',
    HIDE_CART: 'HIDE_CART'
}

const INITIAL_STATE = {
    cart: [],
    hide: true
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPES.ADD_PRODUCT_TO_CART:
            return{
                ...state,
                cart: payload
            }
        case CART_ACTION_TYPES.SHOW_CART:
            return{
                ...state,
                hide: false
            }
            case CART_ACTION_TYPES.HIDE_CART:
                return{
                    ...state,
                    hide: true
                }
            default: 
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const addProductToCart = (product) => {
        dispatch(createAction(CART_ACTION_TYPES.ADD_PRODUCT_TO_CART, product));
    }

    const showCart = () => {
        dispatch(createAction(CART_ACTION_TYPES.SHOW_CART, null));
    }

    const hideCart = () => {
        dispatch(createAction(CART_ACTION_TYPES.HIDE_CART, null));
    }

    const value = {
        cart: state.cart,
        addProductToCart,
        showCart,
        hideCart
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}