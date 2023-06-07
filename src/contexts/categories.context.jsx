import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    setCategoriesCol: () => null,
    categoriesCol: null
});

export const CategoriesProvider = ({children}) => {
    const [categoriesCol, setCategoriesCol] = useState([]);

    useEffect(()=>{
        const getCategoryCol = async () => {
            const categoryCol = await getCategoriesAndDocuments();
            setCategoriesCol(categoryCol);
        };
         
        getCategoryCol();
    },[]);

    const value = {categoriesCol, setCategoriesCol};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

