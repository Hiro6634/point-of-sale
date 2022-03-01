import ShopActionTypes from './shop.types';

export const updateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});

export const incShopItem = (id) => ({
    type: ShopActionTypes.INC_SHOP_ITEM,
    payload: id
});