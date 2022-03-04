import CategoryActionTypes from './category.types';

export const updateCategories = (categoriesMap) => ({
    type: CategoryActionTypes.UPDATE_CATEGORIES,
    payload: categoriesMap
});