import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import shopReducer from './shop/shop.reducer';
import cartReducer from './cart/cart.reducer';
import categoryReducer from './category/category.reducer';
import ticketReducer from './ticket/ticket.reducer';

export default  combineReducers({
    user: userReducer,
    shop: shopReducer,
    cart: cartReducer,
    category: categoryReducer,
    ticket: ticketReducer    
});