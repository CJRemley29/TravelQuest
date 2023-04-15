import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import Map from"../home/map/Map"
import "./AddTrip.css"
import { useAuthContext } from "../hooks/useAuthContext";


const AddTrip = (props) => {
    const [location, setLocation] = useState({});
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)    
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [tripName, setTripName] = useState("");
    const {user} = useAuthContext();
    const navigate = useNavigate();


    useEffect(() => {
        const userLocation = async () => {
            const response = await fetch('http://localhost:4000/api/map/' + user.username, {
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
            })
            const json = await response.json() 
            setLocation({lat: json[0].latitude, lng: json[0].longitude,});
            console.log(location);
          
          }

        userLocation();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            dstlatitude: latitude,
            dstlongitude: longitude,
            user_id: user.username,
            tripName: tripName,
        });
        const response = await fetch('http://localhost:4000/api/trip', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`},
                body: data
            })
            const json = await response.json();
            
            if(!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            setTripName("");
            setLatitude(null);
            setLongitude(null);
            navigate("/");
            
        }



    return(
        <div>
            <h2>Add trip</h2>
            {user && (
            <div className="google-map">
                <Map onClick={location} center={location} zoom={4} setLatitude={setLatitude} setLongitude={setLongitude}></Map>
                <form>
                    <label htmlFor="Text">Trip name</label>
                    <input value={tripName} onChange={(e) => setTripName(e.target.value)} type="text" placeholder="Bytes #1" id="trip" name="trip" />
                    <h4>Coordinates: {latitude} , {longitude}</h4> 
                    <button onClick={handleSubmit}>Submit Trip</button>
                </form>
            </div>
            
            )}
            {!user && (
                <h2>Must be logged in to add a trip!</h2>
            )}
            
        </div>
    );
}

export default AddTrip;