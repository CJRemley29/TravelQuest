import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import {useLogin} from "../hooks/useLogin";
import "./Login.css"

const LoginForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login, error, isLoading} = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password);

        navigate("/");
    }

    return(
        <div className="auth-form">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="Username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="ex: johndoe32" id="Username" name="Username" />
                <label htmlFor="Password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="Password" name="Password" placeholder="***********" />
                <button type="submit">Login</button>
                <button className="link-button" onClick={() => props.onFormSwitch("Register")}>Don't have an account? Register here</button>

            </form>
        </div>
    );
}

export default LoginForm;