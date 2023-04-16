import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ShopItem from '../../components/shop-item/shop-item.component';

//import { selectCategoryMap } from '../../redux/category/category.selectors';

import {  selectShopCollectionsSortByCategory } from '../../redux/shop/shop.selectors';

import { 
    ShopContainer, 
    ShopHeaderContainer,
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from './shop.styles';

const Shop = ({collections}) => {
    return(
    <ShopContainer>
        <ShopHeaderContainer>
            <DescriptionContainer>
                Descripción
            </DescriptionContainer>
            <PriceContainer>
                Precio
            </PriceContainer>
            <QuantityContainer>
                Cant.
            </QuantityContainer>
            <PriceContainer>
                S.Total
            </PriceContainer>
            <DeleteContainer>
                Borrar
            </DeleteContainer>
        </ShopHeaderContainer>
        {
            collections !== null ? 
                collections.map((col)=>(
                    col.enable?(<ShopItem key={col.id} item={col} />):null)
                )
            : null
        }
    </ShopContainer>
)};

const mapStateToProps = createStructuredSelector ({
    collections: selectShopCollectionsSortByCategory,
});

export default connect(mapStateToProps)(Shop);
