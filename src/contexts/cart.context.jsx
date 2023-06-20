import { createContext, useContext, useReducer } from "react";
import cartReducer,{ CartActionType, initialState } from "./cart.reducer";

export const CartContext = createContext(initialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
    const addItemToCart = (productToAdd) => {
        const existingCartItem = state.cartItems.find(
            (cartItem)=>cartItem.id===productToAdd.id
        );
        
        let updatedCart = state.cartItems;
        if(!existingCartItem){
            updatedCart.push({...productToAdd, quantity:1});
        } else {
            const tempCart = updatedCart.map((itemCart) => itemCart.id===productToAdd.id
                ?{...itemCart, quantity
                :itemCart.quantity + 1}:{...itemCart});
            updatedCart = tempCart;
        }
        updateCount(updatedCart);
        updateTotal(updatedCart);
        dispatch({
            type: CartActionType.ADD_ITEM_TO_CART,
            payload: {
                cartItems: updatedCart
            }
        });
    }
 
    const clearItemFromCart = (cardtItemToRemove) => {
        const updatedCart = state.cartItems.filter((cardItem)=>cardItem.id !== cardtItemToRemove.id);
        updateCount(updatedCart);
        updateTotal(updatedCart);
        dispatch({
            type: CartActionType.CLEAR_ITEM_FROM_CART,
            payload:{
                cartItems: updatedCart
            }
        });
    };

    const clearAllItemsFromCart = () => {
        updateCount([]);
        updateTotal([]);
        dispatch({
            type: CartActionType.CLEAR_ALL_ITEMS_FROM_CART,
            payload: {
                cartItems: [],
            }
        });
    };

    const getQuantityFromCart = (product) => {
        const item = state.cartItems.find((cartItem)=>cartItem.id===product.id);

        return item?item.quantity:0;
    }

    const updateCount = (cartItems) => {
        const count = cartItems.reduce((acc, item)=>{
            acc = acc + 1;
            return acc;
        },0)

        dispatch({
            type: CartActionType.UPDATE_CART_COUNT,
            payload: {
                cartCount: count
            }
        });
    }

    const updateTotal = (cartItems) => {
        const cartTotal = cartItems.reduce((acc, item)=>{
            acc = acc + item.quantity * item.price;
            return acc;
        },0)

        dispatch({
            type: CartActionType.UPDATE_CART_TOTAL,
            payload: {
                cartTotal
            }
        });
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