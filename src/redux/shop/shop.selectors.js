import { createSelector } from 'reselect';

const selectShop = state => state.shop; 

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectShopCollections = createSelector(
  [selectCollections],
  shop => shop ? Object.keys(shop).map(key=>shop[key]):[]
);