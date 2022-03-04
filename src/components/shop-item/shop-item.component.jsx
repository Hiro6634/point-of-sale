import React from 'react';
import { connect } from 'react-redux';

import { addItem,removeItem, clearItemFromCart } from '../../redux/cart/cart.actions';
import { 
    ShopItemContainer, 
    ShopItemDescriptionContainerCy,
    ShopItemDescriptionContainerYl,
    ShopItemDescriptionContainerPk,
    ShopItemDescriptionContainer,
    ShopItemPriceContainer,
    ShopItemQuantityContainer,
    ShopItemDeleteContainer
} from './shop-item.styles';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { getItemQuantity } from '../../redux/cart/cart.utils';

const ShopItem = ({item, addItem, clearItem, cartItems}) => {
    const {name, price} = item;

    const CItem = getItemQuantity(cartItems, item.id);
    const quantity = CItem?CItem.quantity:0;

    return(
    <ShopItemContainer>
        { 
            item.color.toLowerCase() === "yellow" ? (
                    <ShopItemDescriptionContainerYl onClick={()=>addItem(item)}>
                        {name}
                    </ShopItemDescriptionContainerYl>
            ):(
                item.color.toLowerCase() === "cyan" ? (
                    <ShopItemDescriptionContainerCy onClick={()=>addItem(item)}>
                        {name}
                    </ShopItemDescriptionContainerCy>
                ):(
                    item.color.toLowerCase() === "pink" ? (
                        <ShopItemDescriptionContainerPk onClick={()=>addItem(item)}>
                            {name}
                        </ShopItemDescriptionContainerPk>
                    ):(
                    <ShopItemDescriptionContainer onClick={()=>addItem(item)}>
                        {name}
                    </ShopItemDescriptionContainer>
                    )
                )
            )
        }
        <ShopItemPriceContainer onClick={()=>addItem(item)}>
            ${price}
        </ShopItemPriceContainer>
        <ShopItemQuantityContainer>
            {quantity}
        </ShopItemQuantityContainer>
        <ShopItemPriceContainer>
            ${price*quantity}
        </ShopItemPriceContainer>        
        <ShopItemDeleteContainer onClick={()=>clearItem(item)}>&#10005;</ShopItemDeleteContainer>
{/*        <DeleteContainer onClick={()=>clearItem(item)}>
            &#10005;
             <ShopItemDeleteContainer>
                <TarshIcon/>
            </ShopItemDeleteContainer>
         </DeleteContainer>
*/}
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