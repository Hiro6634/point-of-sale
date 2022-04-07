import ShopActionTypes from './shop.types';
const INITIAL_STATE = {
    products: null
};

const shopReducer = ( state=INITIAL_STATE, action) => {
    switch( action.type ){
        case ShopActionTypes.UPDATE_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state;
    }
};

export default shopReducer;