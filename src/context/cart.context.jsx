import React, { createContext, useEffect, useReducer } from "react";
import { sendTicket } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer.utils";

export const CartContext = createContext({
    cart: [],
    hide: true,
    total: 0
});


const CART_ACTION_TYPES = {
    ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
    CLEAR_PRODUCT_FROM_CART: 'CLEAR_PRODUCT_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    SHOW_CART: 'SHOW_CART',
    HIDE_CART: 'HIDE_CART',
    UPDATE_TOTAL: 'UPDATE_TOTAL',
    CLOSE_CART: 'CLOSE_CART'
}

const INITIAL_STATE = {
    cart: [],
    hide: true,
    total: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cart: addItemToCart(state.cart, payload),
                hide: false
            }

        case CART_ACTION_TYPES.CLEAR_PRODUCT_FROM_CART:
            return {
                ...state,
                cart: clearItemFromCart(state.cart, payload)
            }

        case CART_ACTION_TYPES.CLEAR_CART:
            return {
                ...state,
                cart: [],
                hide: true
            }
        case CART_ACTION_TYPES.SHOW_CART:
            return {
                ...state,
                hide: false
            }
        case CART_ACTION_TYPES.HIDE_CART:
            return {
                ...state,
                hide: true
            }
        case CART_ACTION_TYPES.UPDATE_TOTAL:
            return {
                ...state,
                total: payload
            }
        case CART_ACTION_TYPES.CLOSE_CART:
            return {
                ...state,
                cart: closingCart(state.cart),
                hide: true
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

const clearItemFromCart = (cartItems, cartItemToRemove) => {
    const filterCart = cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

    return filterCart;
}

const closingCart = (cart) => {
    const items = cart.map((item) => {
        return {
            id: item.id,
            name: item.name,
            quantity: item.quantity
        }
    });
    const total = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const ticket = {
        items,
        total
    }
    sendTicket(ticket);
    return [];

}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    useEffect(() => {
        const cart = state.cart;
        if (cart.length === 0) {
            dispatch(createAction(CART_ACTION_TYPES.HIDE_CART, null));
            updateTotal(0);
        } else {
            const total = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);
            updateTotal(total);
        }


    }, [state.cart]);

    const addProductToCart = (product) => {
        dispatch(createAction(CART_ACTION_TYPES.ADD_PRODUCT_TO_CART, product));
    }

    const clearProductFromCart = (product) => {
        dispatch(createAction(CART_ACTION_TYPES.CLEAR_PRODUCT_FROM_CART, product));
    }

    const clearCart = () => {
        dispatch(createAction(CART_ACTION_TYPES.CLEAR_CART, null));
    }

    const showCart = () => {
        dispatch(createAction(CART_ACTION_TYPES.SHOW_CART, null));
    }

    const hideCart = () => {
        dispatch(createAction(CART_ACTION_TYPES.HIDE_CART, null));
    }

    const updateTotal = (total) => {
        dispatch(createAction(CART_ACTION_TYPES.UPDATE_TOTAL, total));
    }

    const getItemQuantity = (id) => {
        const findedItem = state.cart.filter(item => item.id === id);
        return findedItem[0] ? findedItem[0].quantity : 0;
    }

    const closeCart = () => {
        console.log("DISPATCH CLOSING_CART", state.cart);
        dispatch(createAction(CART_ACTION_TYPES.CLOSE_CART, null));
    }

    const value = {
        cart: state.cart,
        hide: state.hide,
        total: state.total,
        addProductToCart,
        clearProductFromCart,
        clearCart,
        showCart,
        hideCart,
        getItemQuantity,
        closeCart
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}