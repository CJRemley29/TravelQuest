import React, { useState, useEffect} from "react"
import "./Account.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Account = () => {
    const {user} = useAuthContext();
    const [userInfo, setUserInfo] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {        
                const getUserInfo = async () => {
                    const response = await fetch('http://localhost:4000/api/map/' + user.username, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                    })
                    const json = await response.json(); 
                    setUserInfo(json);

                    if(!response.ok) {
                        setIsLoading(false)
                        setError(json.error)
                    }
                  }
        
                getUserInfo();
            }, []);

            console.log(userInfo);

    return(

        
        <div className = "Account">
            {user && (
            <div className="posts">
                { userInfo.map(info => { 
                    return(
                        <center>
                        <div>
                        <div className="data-box">
                        <div className="data-box-header">Account Information:</div>
                        <div className="data-box-item">
                        <div className="data-box-item-label">Username:</div>
                        <div className="data-box-item-value">{info.username}</div>
                        </div>
                        <div className="data-box-item">
                        <div className="data-box-item-label">Total Points:</div>
                        <div className="data-box-item-value">{info.points}</div>
                        </div>
                        <div className="data-box-item">
                        <div className="data-box-item-label">Home Location:</div>
                        <div className="data-box-item-value">{info.latitude + ", "+ info.longitude}</div>
                        </div>
                        </div>
                        </div>
                        </center>
                    )
                })}
            </div>
            )}
            {!user && (
                <h1>Must be logged in to access!</h1>
            )}
        </div>
    );
}

export default Account;