import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ShopItem from '../../components/shop-item/shop-item.component';

import { selectShopCollections } from '../../redux/shop/shop.selectors';

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
                Descripcion
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
    </ShopContainer>
)};

const mapStateToProps = createStructuredSelector ({
    collections: selectShopCollections
});

export default connect(mapStateToProps)(Shop);