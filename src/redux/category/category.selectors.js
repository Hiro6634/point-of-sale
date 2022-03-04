import { createSelector } from 'reselect';

const selectCategory = state => state.category;

export const selectCategories = createSelector(
    [selectCategory],
    category => category.categories
);

export const selectCategoryMap = createSelector(
    [selectCategories],
    category => category ? Object.keys(category).map(key=>category[key]):[]
);