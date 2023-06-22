import { createContext, useEffect, useReducer, useContext } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import categoriesReducer, {initialState, CategoriesActionType} from "./categories.reducer";

export const CategoriesContext = createContext(initialState);

export const CategoriesProvider = ({children}) => {
    const [state, dispatch] = useReducer(categoriesReducer, initialState);

    const setCategories = (categories) => {
        dispatch({
            type: CategoriesActionType.SET_CATEGORIES_COL,
            payload: categories
        });
    }

    const setOrderedCategories = (categories) => {
        const orderList = categories.sort((a,b)=>a.order-b.order);
        dispatch({
            type: CategoriesActionType.SET_ORDERED_CATEGORIES,
            payload: orderList
        });
    }

    useEffect(()=>{
        const getCategoryCol = async () => {
            const categoryCol = await getCategoriesAndDocuments();
            setCategories(categoryCol);
            setOrderedCategories(categoryCol);
        };
         
        getCategoryCol();
    },[]);

    const value = {
        categoriesCol: state.categoriesCol, 
        orderedCategories: state.orderedCategories
    };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

const useCategories = () => {
    const context = useContext(CategoriesContext);

    if( context === undefined){
        throw new Error("useCategories must be used within CategoriesContext");
    }

    return context;
}

export default useCategories;

