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
import { selectCategories, selectCategoryMap } from '../../redux/category/category.selectors';
import { getCategoryByName } from '../../redux/category/category.utils';

const ShopItem = ({item, addItem, clearItem, cartItems,  categoriesMap}) => {
    const {name, price} = item;

    const CItem = getItemQuantity(cartItems, item.id);
    const quantity = CItem?CItem.quantity:0;
    const color = getCategoryByName(categoriesMap, item.category).color.toLowerCase();  
    return(
    <ShopItemContainer>
        { 
            color === "yellow" ? (
                    <ShopItemDescriptionContainerYl onClick={()=>addItem(item)}>
                        {name}
                    </ShopItemDescriptionContainerYl>
            ):(
                color === "cyan" ? (
                    <ShopItemDescriptionContainerCy onClick={()=>addItem(item)}>
                        {name}
                    </ShopItemDescriptionContainerCy>
                ):(
                    color === "pink" ? (
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
    cartItems: selectCartItems,
    categories: selectCategories,
    categoriesMap: selectCategoryMap
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopItem);