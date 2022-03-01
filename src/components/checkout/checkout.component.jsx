import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../checkout-item/checkout-item.component';

import { 
    CheckoutContainer,
    CheckoutHeaderContainer,
    HeaderBlockContainer,
    TotalContainer
 } from './checkout.styles';

const Checkout = ({cartItems, total}) => (
    <CheckoutContainer>
        {
            cartItems.map( cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))
        }
        <TotalContainer>TOTAL: ${total}</TotalContainer>
     </CheckoutContainer>

); 

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(Checkout);
