import React from 'react';
import { connect } from 'react-redux';

import { addItem,removeItem, clearItemFromCart } from '../../redux/cart/cart.actions';
import { 
    ShopItemContainer, 
    ShopItemDescriptionContainerCy,
    ShopItemDescriptionContainerYl,
    ShopItemDescriptionContainerPk,
    ShopItemDescriptionContainer
} from './shop-item.styles';

import { 
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from '../../pages/shop/shop.styles';
//import { ShopItemDeleteContainer } from './shop-item.styles';

//import { ReactComponent as TarshIcon} from '../../assets/trash-outline.svg';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { getItemQuantity } from '../../redux/cart/cart.utils';

const ShopItem = ({item, addItem, clearItem, cartItems}) => {
    const {name, price} = item;

    const CItem = getItemQuantity(cartItems, item.id);
    const quantity = CItem?CItem.quantity:0;

    console.log("COLOR: " + item.color.toUpperCase());
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
        <PriceContainer onClick={()=>addItem(item)}>
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
{/*             <ShopItemDeleteContainer>
                <TarshIcon/>
            </ShopItemDeleteContainer>
 */}        </DeleteContainer>
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