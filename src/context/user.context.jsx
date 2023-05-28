import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    currentUSer: null,
    setCurrentUSer: () => null
});

export const UserProvider = ({children}) => {
    const [currentUSer, setCurrentUSer] = useState(null);
    const value = {currentUSer, setCurrentUSer};

    useEffect(()=>{
        const unsubscribe = 
    });
}