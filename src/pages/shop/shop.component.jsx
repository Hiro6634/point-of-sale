import React from 'react';
import { connect } from 'react-redux';

import ShopItem from '../../components/shop-item/shop-item.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCollections, selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const ShopPage = ({collections, mycols}) => {
    console.log("COLLECTIONS", collections);
    console.log("myCols",mycols);
    mycols.map((item)=>{
        console.log(item)
    });
    return(
    <div>
        <h2>ShopPage</h2>
        <div>
            {
                mycols.map((col)=>(
                    <ShopItem item={col}/>                    
                ))
            }
        </div>
        <CartDropdown/>
    </div>
)};

const mapStateToProps = state => ({
    collections: selectCollections(state),
    mycols: selectCollectionsForPreview(state)
});

export default connect(mapStateToProps)(ShopPage);