const PRODUCT_ACTION_TYPES = {
    UPDATE_PRODUCTS: 'UPDATE_PRODUCTS'
};

const productReducer = (state, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case UPDATE_PRODUCTS: 
            return {
                ...state,
                ...payload
            }
    }
}