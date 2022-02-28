import React from 'react';
import { connect } from 'react-redux';

import { addItem,removeItem,clearItem, clearItemFromCart } from '../../redux/cart/cart.actions';
import { selectCartItemQuantity } from '../../redux/cart/cart.selectors';
import { ShopItemContainer } from './shop-item.styles';

import { 
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from '../../pages/shop/shop.styles';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const ShopItem = ({item, addItem, removeItem, clearItem, cartItems, getQuantity}) => {
    const {name, price, quantity} = item;
//    console("QTTY:" + getQuantity(item)?getQuantity(item):0);
    //const quantity = 0;
    //const quantity = cartItems.find((it)=>(it.id===item.id));
    console.log("QUANTITY", item);
    return(
    <ShopItemContainer>
        <DescriptionContainer>
            {name}
        </DescriptionContainer>
        <PriceContainer>
            ${price}
        </PriceContainer>
        <QuantityContainer>
            <div onClick={()=>removeItem(item)}>&#10094;  </div>
            <span>{quantity}</span>
            <div onClick={()=>addItem(item)}>  &#10095;</div>
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
    clearItem: (item) => dispatch(clearItemFromCart(item)),
    getQuantity: (item) => dispatchEvent(selectCartItemQuantity(item))
});

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem);