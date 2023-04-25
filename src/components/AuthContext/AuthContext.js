import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer  = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null //where we will store the user email property
    })

    //here we will be using the useEffect hook 
    //This make it where when you login and you refresh the browser and it won't logout
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, []) 
    
    console.log('AuthContext state: ', state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )

}