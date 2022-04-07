import { createSelector } from 'reselect';

const selectShop = state => state.shop; 

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.products
);

export const selectShopCollections = createSelector(
  [selectCollections],
  shop => shop ? Object.keys(shop).map(key=>shop[key]):[]
);

export const selectShopCollectionsSortByCategory = createSelector(
  [selectShopCollections],
  shop => shop ? shop.sort((a,b)=>(a.category.toLowerCase()>b.category.toLowerCase()?-1:1)): null
);