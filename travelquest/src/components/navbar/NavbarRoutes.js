import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext";

//component
import RegistrationForm from '../registration/RegistrationForm';
import LoginForm from '../login/LoginForm';
import Home from '../home/Home';



//This function is when you click login or signup, it display the
// signup or login on content section
//This page is for the path of top nav bar
function Navigationbar() {
  const {user} = useAuthContext()

  return (
    <React.Fragment>
          <Routes>
              <Route path="/" element={<Home/>}/> 
              <Route path="/signin" element={!user ? <LoginForm/> : <Navigate to="/signin"/>} />
              <Route path="/signup" element={!user ? <RegistrationForm/>: <Navigate to="/register"/>} />
              
          </Routes>
          
          
    </React.Fragment>
  );
}

export default Navigationbar