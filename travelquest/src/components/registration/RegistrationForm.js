import React, {useState} from "react"
import { Navigate, useNavigate } from "react-router-dom";
import '../login/Login.css';
import { useSignup } from "../hooks/useSignup";

const RegistrationForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState([]);
    const {signup, error, isLoading} = useSignup();
    const [pause, setPause] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
         await sleep(200);
        } else {
        console.log("Geolocation is not supported by this browser.");
        }

        // console.log(username +" "+ password + " "+lat + " "+long );

        await signup(username,password,latitude,longitude);

        if( !isLoading ){
          setUsername("");
          setPassword("");
          setLatitude("");
          setLongitude("");
          navigate("/");
        }
    }

    const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));

    const getLocation = async () => {
            if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(showPosition);
                await sleep(200);
            } else {
              console.log("Geolocation is not supported by this browser.");
            }
          }

    function showPosition(position) {
       console.log("Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setPause(false);
      }

    return(
        <div className="auth-form">
            <h2>Register</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
                <label htmlFor="Username">Username</label>
                <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="ex: johndoe32" id="Username" name="Username" />
                <label htmlFor="Password">Password</label>
                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="Password" name="Password" placeholder="************" />
                <label htmlFor="TOS">Accept terms of service <br/>**your current location will be taken when you register**</label>
                <input required onClick={() => { setPause(true); getLocation() }} type="checkbox" name="TOS"/>
                <button type="submit" disabled={pause}>Register</button>
                <button className="link-button" onClick={() => props.onFormSwitch("Login")}>Already have an account? Login here</button>
            </form>
            
        </div>
    );
}

export default RegistrationForm;