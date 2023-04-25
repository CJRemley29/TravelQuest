import { useState } from "react";
import {useAuthContext} from './useAuthContext';


export const useLogin = () =>{
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()
    const {dispatch} = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/routes/user/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        const json = await response.json() //return token if success else error message

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            //save the user to local storage. So if user close the broswer and go back it still got the token
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
        }
    }

    return {login, isLoading, error};

}