import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useSignup } from './hooks/useSignup';


function Signup(props) {
  // Define the state with useState hook
  const navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {signup, error, isLoading} = useSignup();
  
  const handleSubmit = async(e) =>{
    e.preventDefault();

    await signup(username, password);
  }
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input 
            type="text" 
            name='username'
            className='input'
            onChange={(e) => setUsername(e.target.value)} 
            value={username} 
            />
          </label>
          <label>
            Password:
            <input 
            type="password" 
            name='password'
            className='input'
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            />
          </label>
          <button type="submit" disabled={isLoading}>Sign Up</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;