import React from 'react';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import { ShopItemContainer } from './shop-item.styles';

const ShopItem = ({item, addItem}) => (
    <ShopItemContainer on onClick={()=>addItem(item)}>
        <span>{item.name}</span>
        <span>${item.price}</span>
    </ShopItemContainer>
); 

const mapDispatchToProps = dispatch => ({
    addItem: (item) => dispatch(addItem(item))
});


export default connect(null, mapDispatchToProps)(ShopItem);