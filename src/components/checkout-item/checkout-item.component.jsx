import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart } from '../../redux/cart/cart.actions';

import { 
    CheckoutItemContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem: cartItem, clearItem}) => {
    const { name, price, quantity} = cartItem;
    return(
        <CheckoutItemContainer>
            <QuantityContainer>{quantity}</QuantityContainer>
            <TextContainer>{name}</TextContainer>
            <TextContainer>${price*quantity}</TextContainer>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item))
});

export default connect(null,mapDispatchToProps)(CheckoutItem);
