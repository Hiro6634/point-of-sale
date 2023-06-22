export const initialState = {
    categoriesCol: [],
    orderedCategories: []
};

export const CategoriesActionType = {
    SET_CATEGORIES_COL: "SET_CATEGORIES_COL",
    SET_ORDERED_CATEGORIES: "SET_ORDERED_CATEGORIES",
};

const categoriesReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CategoriesActionType.SET_CATEGORIES_COL:
            return{
                ...state,
                categoriesCol: payload
            }
        case CategoriesActionType.SET_ORDERED_CATEGORIES:
            return{
                ...state,
                orderedCategories: payload
            }
        default: 
            throw new Error(`No case for type ${type} in categoriesReducer`)
    }
}

export default categoriesReducer;