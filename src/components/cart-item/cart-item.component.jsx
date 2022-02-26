import React from 'react';

import { CartItemContainer } from './cart-itemstyles';

const CartItem = ({item:{name, price, quantity}}) => (
    <CartItemContainer>
        <span>{quantity}</span>
        <span>{name}</span>
        <span>{price*quantity}</span>
    </CartItemContainer>
);

export default CartItem;