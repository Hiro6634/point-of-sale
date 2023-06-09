import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if( existingCartItem ){
        return cartItems.map((cartItem)=>cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if( existingCartItem ){
        return cartItems.map((cartItem)=>
        cartItem.id === productToRemove.id 
            ? {...cartItem, quntity: cartItem.quantity - 1}
            : cartItem
        );
    }
};

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    getQuatityFromCart: () => {},
    clearAllItemsFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
  
    useEffect(()=>{
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );   
        setCartCount(newCartCount);    
    },[cartItems]);

    useEffect(()=>{
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, {
            id: productToAdd.id,
            name: productToAdd.name
        }));
    };

    const removeItemFromCart = (cardtItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cardtItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const getQuatityFromCart = (cartItem) => {
        const Item = cartItems.find((It)=>It.id===cartItem.id);

        return Item?Item.quantity:0;
    };

    const clearAllItemsFromCart = () => {
            setCartItems([]);
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        getQuatityFromCart,
        clearAllItemsFromCart,
        cartItems,
        cartCount,
        cartTotal      
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 