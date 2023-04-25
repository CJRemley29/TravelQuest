import React, {Component} from 'react'
import './Nav.css'
import { Link } from "react-router-dom";

function Nav () {
   
  return(
    <div className="navbar">
      <div className="logo">Travel Quest</div>
       <ul className="nav-links">
        <li><Link to="/">Leaderboard</Link></li>
        <li> <Link to="/Login">Login</Link></li> 
        <li> <Link to="/Map">Map</Link></li>
       </ul>
    </div>
  );

}

export default Nav;