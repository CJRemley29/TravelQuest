import React, {useState} from 'react';
import LoginForm from './LoginForm.js';
import RegistrationForm from '../registration/RegistrationForm.js';
import './Login.css';


function Login() {
    const [currentForm, setCurrentForm ] = useState("Login");

    const toggleForm = (formName) => {
        console.log(formName);
        setCurrentForm(formName);
    }

      return (
      <>
      <div className='login'> 
        {
            currentForm === "Login" ? <LoginForm onFormSwitch={toggleForm}/> : <RegistrationForm onFormSwitch={toggleForm}/>
        }
      </div>
      </>
      );
}

export default Login;