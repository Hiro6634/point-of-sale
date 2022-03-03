import { CartActionTypes } from './cart.types';
import { addItemsToCart, removeItemsFromCart } from './cart.utils';

const INITIAL_STATE = {
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch( action.type){
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemsToCart( state.cartItems, action.payload)
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemsFromCart(state.cartItems, action.payload)
            };
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return { 
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
            };
        case CartActionTypes.CLEAR_ALL_ITEMS_FROM_CART:
            return {
                ...state,
                cartItems:[]
            };
        default:
            return state;
    }
}

export default cartReducer;