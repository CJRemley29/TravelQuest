import React from "react";
import {  Link, useMatch, useResolvedPath } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import logo from "./imgs/bytesbucklist.png";
import title from "./imgs/bytesbucketlistheader.png"
import "./Navbar.css";

const Navbar = () => {
    const {user} = useAuthContext();
    const {logout} = useLogout();

  return (
    <div className="nav">
        <CustomLink to="/"><img src={logo} alt="Logo"></img></CustomLink>
        <img className="title" src={title} alt="Byte's BucketList"></img>
        <ul>
            <li>
                <CustomLink to="/addTrip">Add Trip</CustomLink>
            </li>
            <li>
                <CustomLink to="/account">Account</CustomLink>
            </li>
            {!user && (
                <li>
                    <CustomLink to="/signin">Sign In</CustomLink>
                </li>
            )}
            {user && (
                <li>
                    <button onClick={() => logout()}>Sign out</button>
                </li>
            )}
        </ul>
    </div>
  );
    
}

export default Navbar;

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});
    return (
        <li className={isActive ? "active" : ""}> 
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}