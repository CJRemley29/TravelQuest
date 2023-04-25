import React from "react";
import LeaderBoard from "./components/LeaderBoard";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Map from "./components/Map";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import'./App.css';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/" element={<LeaderBoard/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Map" element={<Map/>}/>
          <Route path="/Sign UP" element={<Signup/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
