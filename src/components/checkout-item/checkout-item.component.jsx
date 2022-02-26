import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart } from '../../redux/cart/cart.actions';

import { 
    CheckoutItemContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, clearItem}) => {
    const { name, price, quantity} = cartItem;
    return(
        <CheckoutItemContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>{quantity}</QuantityContainer>
            <TextContainer>${price}</TextContainer>
            <RemoveButtonContainer onClick={()=>clearItem(cartItem)}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item))
});

export default connect(null,mapDispatchToProps)(CheckoutItem);
