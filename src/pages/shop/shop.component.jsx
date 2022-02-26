import React from 'react';
import { connect } from 'react-redux';

import ShopItem from '../../components/shop-item/shop-item.component';
import Checkout from '../../components/checkout/checkout.component';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';

const ShopPage = ({collections}) => {
    return(
    <div>
        <h2>VENTAS</h2>
        <div>
            {
                collections.map((col)=>(
                    <ShopItem item={col}/>                    
                ))
            }
        </div>
        <Checkout/>
    </div>
)};

const mapStateToProps = createStructuredSelector ({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(ShopPage);