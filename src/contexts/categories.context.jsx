import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    setCategories: () => null,
    categories: null
});

export const CategoriesProvider = ({children}) => {
    const [categoriesCol, setCategoriesCol] = useState(null);
    const value = {categoriesCol, setCategoriesCol};

    useEffect(()=>{
        const getCategoryCol = async () => {
            const categoryCol = await getCategoriesAndDocuments();
            setCategoriesCol(categoryCol);
        };
         
        getCategoryCol();
    },[]);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

