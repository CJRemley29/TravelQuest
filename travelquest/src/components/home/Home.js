import React, { useEffect, useState } from "react"
import LeaderboardList from "./leaderboard/LeaderBoardList";
import Trip from "./trips/Trip"
import Map from "./map/Map.js";
import {useLoadScript} from '@react-google-maps/api';
import './Home.css'
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyAqkEc9JSJSU62mA9p7zqud8z96RmjuzeM"});
    const {user} = useAuthContext();
    const [trips, setTrips] = useState([]);
    const [location, setLocation] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [update, setUpdate] = useState(false);
    
    

    useEffect(() => {
            const userLocation = async () => {
                console.log(user);
                const response = await fetch('http://localhost:4000/api/map/' + user.username, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
                })
                const json = await response.json() 
                setLocation({lat: json[0].latitude, lng: json[0].longitude,});
                console.log(location);
              
                if(!response.ok) {
                    setIsLoading(false)
                    setError(json.error)
                }
              }

              const userTrips = async () => {
                const response = await fetch('http://localhost:4000/api/trip/' + user.username, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
                })
                const json = await response.json() 
                setTrips(json);
                console.log(location);
              
                if(!response.ok) {
                    setIsLoading(false)
                    setError(json.error)
                }
              }

            userLocation();
            userTrips();
        }, [update])
    
            if(!isLoaded){
                return <div>Loading...</div>;
            }

            console.log(JSON.stringify(location));

    return(
        <>
                {user && (
                    <div className="container">
                    <div className="item" onClick={() => {update ? setUpdate(false): setUpdate(true) }}><LeaderboardList /></div>
                        <div className="item"><Map onClick={location} center={location} zoom={5} /></div>
                        <div className="item-trips">
                        <div className="marginTop">
                            <div className='grid-container'>
                                <div className='grid-item'>Trip</div>
                                <div className='grid-item'>Status</div>
                                <div className='grid-item'>points</div>
                                <div className='grid-item'>latitude</div>
                                <div className='grid-item'>longitude</div>
                            </div>
                        </div>
                        
                        {trips.map(trip => {
                            return(
                            <Trip 
                                _id={trip._id}
                                status={trip.status}
                                dstlatitude={trip.dstlatitude}
                                dstlongitude={trip.dstlongitude}
                                user_id={trip.user_id}
                                tripName={trip.tripName}
                                possiblePoints={trip.possiblePoints}
                            />
                            );
                        })}
                        </div>
                    </div>
                )}

                {!user && ( 
                <div className="container">
                    <div className="item"><LeaderboardList /></div>
                    <div className="item"><Map center={{ lat: 37, lng: -95.5, }} zoom={4}/></div>
                </div>
                
                )}
                
            </>
       
    );
}

export default Home;