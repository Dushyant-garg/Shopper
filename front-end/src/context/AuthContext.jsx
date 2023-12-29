import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = null

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "USER":
            return action.payload

        case "LOG_OUT":
            return null

        default:
            return state
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            dispatch({type:"USER",payload:user})
        }
    },[])
    return (
        <AuthContext.Provider value={{ state, dispatch, }}>
            {children}
        </AuthContext.Provider>
    );
};