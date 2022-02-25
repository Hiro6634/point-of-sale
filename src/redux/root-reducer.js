import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import menuReducer from './menu/menu.reducer';
import shopReducer from './shop/shop.reducer';
import cartReducer from './cart/cart.reducer';

export default  combineReducers({
    user: userReducer,
    shop: shopReducer,
    menu: menuReducer,
    cart: cartReducer
});