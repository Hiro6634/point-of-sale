import ShopActionTypes from './shop.types';
import { incrementShopItem } from './shop.utils';
const INITIAL_STATE = {
    collections: null
};

const shopReducer = ( state=INITIAL_STATE, action) => {
    console.log("REDUCER", action);
    switch( action.type ){
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        case ShopActionTypes.INC_SHOP_ITEM:
            return {
                ...state,
                collections: incrementShopItem(state.collections, action.payload)
            }
        default:
            return state;
    }
};

export default shopReducer;