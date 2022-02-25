import React from 'react';

import { CartItemContainer } from './cart-itemstyles';

const CartItem = ({item:{name, price, quantity}}) => (
    <CartItemContainer>
        <span>{name}</span>
        <span>{quantity}</span>
        <span>{price}</span>
    </CartItemContainer>
);

export default CartItem;