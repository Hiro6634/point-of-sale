import { createContext, useContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const CART_ACTION_TYPES = {
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
    CLEAR_ALL_ITEMS_FROM_CART: 'CLEAR_ALL_ITEMS_FROM_CART',
    UPDATE_CART_COUNT: 'UPDATE_CART_COUNT',
    UPDATE_CART_TOTAL: 'UPDATE_CART_TOTAL',

};

export const CartContext = createContext(INITIAL_STATE);

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
            return{
                ...state,
                cartItems: payload.cartItems,
                cartCount: payload.cartCount,
                cartTotal: payload.cartTotal
            }

        case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: payload.cartItems,
                cartCount: payload.cartCount,
                cartTotal: payload.cartTotal
            }
        case CART_ACTION_TYPES.CLEAR_ALL_ITEMS_FROM_CART:
            return{
                ...state,
                cartItems: [],
                cartCount: 0,
                cartTotal: 0
            }
            default:
            throw new Error(`No case for type ${type} in cartReducer`);
    }
}

const updateCount = (cartItems) => {
    const count = cartItems.reduce((acc, item)=>{
        acc = acc + 1;
        return acc;
    },0)

    return count;
}

const updateTotal = (cartItems) => {
    const cartTotal = cartItems.reduce((acc, item)=>{
        acc = acc + item.quantity * item.price;
        return acc;
    },0)

    return cartTotal;
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    
    const addItemToCart = (productToAdd) => {
        const exitsCartItem = state.cartItems.find((cartItem)=>(cartItem.id===productToAdd.id));
        let updatedCart = state.cartItems;

        if( !exitsCartItem){
            updatedCart.push({
                ...productToAdd,
                quantity: 1
            });
        } else {
            const tempCart = updatedCart.map((itemCart)=>itemCart.id===productToAdd.id
                ?{
                    ...itemCart, 
                    quantity: itemCart.quantity + 1
                }
                :{
                    ...itemCart
                } );
            updatedCart = tempCart;
        }
        
        dispatch(createAction(CART_ACTION_TYPES.ADD_ITEM_TO_CART, {
            cartItems: updatedCart,
            cartCount: updateCount(updatedCart),
            cartTotal: updateTotal(updatedCart)
        }));
    }
 
    const clearItemFromCart = (cardtItemToRemove) => {
        const updatedCart = state.cartItems.filter((cardItem)=>cardItem.id !== cardtItemToRemove.id);
        const cartCount = updateCount(updatedCart);
        const cartTotal = updateTotal(updatedCart);
    
        dispatch(createAction(CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART, {
            cartItems: updatedCart,
            cartCount: cartCount,
            cartTotal: cartTotal
        }));
    };

    const clearAllItemsFromCart = () => {
        dispatch(createAction(CART_ACTION_TYPES.CLEAR_ALL_ITEMS_FROM_CART, null));
    };

    const getQuantityFromCart = (product) => {
        const item = state.cartItems.find((cartItem)=>cartItem.id===product.id);
        return item?item.quantity:0;
    }

    const value = {
        addItemToCart,
        clearItemFromCart,
        clearAllItemsFromCart,
        getQuantityFromCart,
        cartItems: state.cartItems,
        cartCount: state.cartCount,
        cartTotal: state.cartTotal      
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 

const useCart = () => {
    const context = useContext(CartContext);

    if( context === undefined ){
        throw new Error("useCart must be used within CartContext");
    }

    return context;
}

export default useCart;