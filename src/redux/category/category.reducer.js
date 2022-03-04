import CategoryActionTypes from './category.types';

const INITIAL_STATE = {
    categories: null
};

const categoryReducer = (state=INITIAL_STATE, action) => {
    switch( action.type){
        case CategoryActionTypes.UPDATE_CATEGORIES:
            return{
                ...state,
                categories: action.payload
            };
        default: 
            return state;
    }
};

export default categoryReducer;