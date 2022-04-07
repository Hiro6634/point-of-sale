import ShopActionTypes from './shop.types';

export const updateCollections = (productsMap) => ({
    type: ShopActionTypes.UPDATE_PRODUCTS,
    payload: productsMap
});

