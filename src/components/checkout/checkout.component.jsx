import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CustomButton from '../custom-button/custom-button.component';
import CheckoutItem from '../checkout-item/checkout-item.component';

import { 
    CheckoutContainer,
    CheckoutHeaderContainer,
    CheckoutTicketContainer,
    HeaderBlockContainer,
    TotalContainer
 } from './checkout.styles';

const Checkout = ({cartItems, total}) => (
    <CheckoutContainer>
        <CheckoutTicketContainer>
            {
                cartItems.map( cartItem => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                ))
            }
            <TotalContainer>TOTAL: ${total}</TotalContainer>
        </CheckoutTicketContainer>
        <CustomButton>IMPRIMIR</CustomButton>
     </CheckoutContainer>

); 

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(Checkout);