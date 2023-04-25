import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";

function Login() {

    let navigate = useNavigate(); 
      const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
      }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
    
  const handleSubmit = async(e) =>{
    e.preventDefault()
    await login(username, password)
  }  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Log In</h2>
        <h3> Don't have account?<Link to="/Sign Up">Sign Up!</Link></h3>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" disabled={isLoading}>Sign In</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;