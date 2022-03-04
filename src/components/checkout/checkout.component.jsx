import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CustomButton from '../custom-button/custom-button.component';
import Ticket from '../ticket/ticket.component';

import { withRouter } from 'react-router-dom';
import { 
    CheckoutContainer,
    CheckoutTitleContainer,
    CheckoutButtonsContainer
 } from './checkout.styles';

 import { clearAllItemsFromCart } from '../../redux/cart/cart.actions';

const Checkout = ({cartItems, total, history, clearAllItems}) => (
    <CheckoutContainer>
        <CheckoutTitleContainer>TICKET</CheckoutTitleContainer>
        <Ticket/>
        <CheckoutButtonsContainer>
            <CustomButton onClick={()=>history.push('/confirm')}>IMPRIMIR</CustomButton>
            <CustomButton isGoogleSignIn onClick={()=>clearAllItems()}>CANCELAR</CustomButton>
        </CheckoutButtonsContainer>        
     </CheckoutContainer>

); 

const mapDispatchToProps = dispatch => ({
    clearAllItems: () => dispatch(clearAllItemsFromCart())
})
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
