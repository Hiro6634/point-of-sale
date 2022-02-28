import React from 'react';
import { connect } from 'react-redux';

import ShopItem from '../../components/shop-item/shop-item.component';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';

import { 
    ShopContainer, 
    ShopHeaderContainer,
    DescriptionContainer,
    PriceContainer,
    QuantityContainer,
    DeleteContainer
} from './shop.styles';

const Shop = ({collections}) => {
    console.log("COLLECTIONS", collections);
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
            collections.map((col)=>(
                <ShopItem item={col}/>                    
            ))
        }
    </ShopContainer>
)};

const mapStateToProps = createStructuredSelector ({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(Shop);