import { useState } from "react";
import {useAuthContext} from './useAuthContext'

//this is custom useHook that will handle when we hit that api endpoint of our application
//which gonna signup the user using what the user entered in the input
export const useSignup = () =>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    //This is the function where we take in the user username and password
    const signup = async (username, password) => {
        setIsLoading(true) //we setting true because we just starting the request
        setError(null)

        //here is where we make the post request
        const response = await fetch('http://localhost:4000/routes/user/signup', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, password}) //we are passing username and password in JSON format
        })

        //return us a respone json web token if success else error message
        const json = await response.json() 

        //if the resonse failed, we returned error
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            //save the user to local storage. So if user close the broswer and go back it still got the token
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}

}