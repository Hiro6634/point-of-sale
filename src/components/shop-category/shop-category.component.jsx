import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//import ShopItem from '../../components/shop-item/shop-item.component';
import {  selectShopCollections } from '../../redux/shop/shop.selectors';

const ShopCategory = (collections, allState) => {
    console.log("STATE", allState);
 //   console.log("SHOPCATEGORY["+category.category.name+"]", collections);
    return(
        <div><span>{/*category.category.name*/}</span></div>
    )};

//const mapStateToProps = createStructuredSelector({
//    collections: selectShopCollections
//});

const mapStateToProps = (state) => ({
    collections: selectShopCollections(state),
    allState: state
});
export default connect(mapStateToProps)(ShopCategory);