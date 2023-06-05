import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    setCategories: () => null,
    categories: null
});

export const CategoriesProvider = ({children}) => {
    const [categoriesCol, setCategoriesCol] = useState({
        setCategoriesCol: ()=>null,
        categoriesCol:[]
    });

    useEffect(()=>{
        console.log("CATEGORIES BEGIN");
        const getCategoryCol = async () => {
            const categoryCol = await getCategoriesAndDocuments();
            console.log("GET CATEGOR...", categoryCol);
            setCategoriesCol(categoryCol);
        };
         
        getCategoryCol();
        console.log("CATEGORIES END");
    },[]);

    const value = {categoriesCol, setCategoriesCol};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
}

