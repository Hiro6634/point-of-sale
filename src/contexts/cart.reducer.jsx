export const initialState = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

export const CartActionType = {
    ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
    CLEAR_ITEM_FROM_CART: "CLEAR_ITEM_FROM_CART",
    CLEAR_ALL_ITEMS_FROM_CART: "CLEAR_ALL_ITEMS_FROM_CART",
    UPDATE_CART_COUNT: "UPDATE_CART_COUNT",
    UPDATE_CART_TOTAL: "UPDATE_CART_TOTAL",
};

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CartActionType.ADD_ITEM_TO_CART:
            return{
                ...state,
                cartItems: payload.cartItems
            }
        case CartActionType.CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: payload.cartItems
            }
        case CartActionType.CLEAR_ALL_ITEMS_FROM_CART:
            return{
                ...state,
                cartItems: payload.cartItems
            }
        case CartActionType.UPDATE_CART_COUNT:
            return{
                ...state,
                cartCount: payload.cartCount
            }
        case CartActionType.UPDATE_CART_TOTAL:
            return{
                ...state,
                cartTotal: payload.cartTotal
            }
            default:
            throw new Error(`No case for type ${type} in cartReducer`);
    }
}

export default cartReducer;