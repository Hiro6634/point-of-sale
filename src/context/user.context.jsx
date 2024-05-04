import {
    createContext,
    useEffect,
    useReducer
} from "react";

import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from "../utils/firebase/firebase.utils";

import { useContext } from "react";
import { createAction } from "../utils/reducer.utils";

export const UserContext = createContext({
   currentUser: null,
   setCurrentUser: ()=>null, 
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch( type ){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null,
};

export const UserProvider = ({children}) => {
    const [{currentUser}, dispatch] = useReducer( userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch( createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = {currentUser, setCurrentUser};

    useEffect(()=>{()=>{
        const  unsubscribe = onAuthStateChangedListener((user)=>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }}, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUser = () => {
    const context = useContext(UserContext);
    if( context === undefined ){
        throw new Error("useUser must be within UserContext");
    } 
    return context;
}

export default useUser;