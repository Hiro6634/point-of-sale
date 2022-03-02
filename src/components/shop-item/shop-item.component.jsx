import React from 'react';
import { connect } from 'react-redux';

import { addItem,removeItem, clearItemFromCart } from '../../redux/cart/cart.actions';
import { ShopItemContainer } from './shop-item.styles';

import { 
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from '../../pages/shop/shop.styles';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { getItemQuantity } from '../../redux/cart/cart.utils';

const ShopItem = ({item, addItem, clearItem, cartItems}) => {
    const {name, price} = item;

    const CItem = getItemQuantity(cartItems, item.id);
    const quantity = CItem?CItem.quantity:0;

    return(
    <ShopItemContainer>
        <DescriptionContainer onClick={()=>addItem(item)}>
            {name}
        </DescriptionContainer>
        <PriceContainer>
            ${price}
        </PriceContainer>
        <QuantityContainer>
            {quantity}
        </QuantityContainer>
        <PriceContainer>
            ${price*quantity}
        </PriceContainer>        
        <DeleteContainer onClick={()=>clearItem(item)}>
            &#10005;
        </DeleteContainer>
    </ShopItemContainer>
)}; 

const mapDispatchToProps = dispatch => ({
    addItem: (item) => dispatch(addItem(item)),
    removeItem: (item) => dispatch(removeItem(item)),
    clearItem: (item) => dispatch(clearItemFromCart(item))
});

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem);