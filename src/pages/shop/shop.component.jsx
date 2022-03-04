import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ShopItem from '../../components/shop-item/shop-item.component';
import ShopCategory from '../../components/shop-category/shop-category.component';

import { selectCategoryMap } from '../../redux/category/category.selectors';

import { selectCollections, selectShopCollectionsSortByCategory } from '../../redux/shop/shop.selectors';

import { 
    ShopContainer, 
    ShopHeaderContainer,
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from './shop.styles';

const Shop = ({collections, categories}) => {
    console.log("COLLECTIONS", collections);
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
                <ShopItem key={col.id} item={col}/>                    
            ))
            : null
        }
        {/*
            categories !== null ?
                categories.map(category=>(
                    <ShopCategory key={category.id} category={category}/>
                )) 
                : null
        */}
    </ShopContainer>
)};

/*const mapStateToProps = createStructuredSelector ({
    collections: selectShopCollections,
    categories: selectCategoryMap
});
*/
const mapStateToProps = (state) => ({
    collections: selectShopCollectionsSortByCategory(state),
    categories: selectCategoryMap(state)
});

export default connect(mapStateToProps)(Shop);
