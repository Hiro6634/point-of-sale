export const initialState = {
    productsCol: {}
};

export const ProductsActionType = {
    SET_PRODUCTS_COL: "SET_PRODUCTS_COL",
};

const productsReducer = (state, action) => {
    const { type, payload } = action;

    switch( type){
        case ProductsActionType.SET_PRODUCTS_COL:
            return {
                ...state,
                productsCol: payload
            }
        default: 
            throw new Error(`No case for type ${type} in productsReducer`)
    }
};


export default productsReducer;