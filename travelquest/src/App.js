import './App.css';
import Navbar from './components/navbar/Navbar.js';
import React, {useState} from 'react';
import AddTrip from './components/addTrip/AddTrip';
import Account from './components/account/Account';
import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';


function App() {
      return (
      <body>
        <Navbar/>
        <div className='container'> 
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/addTrip" element={<AddTrip/>} />
            <Route path="/account" element={<Account/>} />
            <Route path="/signin" element={<Login/>} />
          </Routes>
      </div>
    </body>
      );
}

export default App;