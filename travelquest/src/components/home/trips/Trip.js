import React, { useState, useContext, useEffect } from 'react'
import '../Home.css';
import ConfirmModal from './modals/ConfirmModal';
import BackDrop from './modals/BackDrop';
import { useAuthContext } from "../../hooks/useAuthContext";


const Trip = props => {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {user} = useAuthContext();

    const lat = props.dstlatitude;
    const lng = props.dstlongitude

    console.log(props);

    const confirmHandler = () => {
        const getLocation = async () => {
            if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(showPosition);
            } else {
              console.log("Geolocation is not supported by this browser.");
            }
          }

          getLocation();

        setConfirmModalOpen(true);
    }

    const closeModal = props => {
        setConfirmModalOpen(false);
    }

    const confirm = async  () => {
          const lon1 =  longitude * Math.PI / 180;
          const lon2 = lng * Math.PI / 180;
          const lat1 = latitude * Math.PI / 180;
          const lat2 = lat * Math.PI / 180;

            // Haversine formula
            let dlon = lon2 - lon1;
            let dlat = lat2 - lat1;
            let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2),2);
                
            let c = 2 * Math.asin(Math.sqrt(a));
            console.log(c)

            // for miles
            let r = 3956;
            console.log(Math.round(c * r));
            // calculate the result
            const distance  = (c * r);
            if(distance < 25){
                const data = JSON.stringify({
                    possiblePoints: props.possiblePoints,
                });
                const response = await fetch('http://localhost:4000/api/user/points/' + user.username, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`},
                        body: data
                    })
                const response2 = await fetch('http://localhost:4000/api/trip/' + props._id, {
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`},
                    })
                    const json = await response.json();
                    
                    if(!response.ok) {
                        setIsLoading(false)
                        setError(json.error)
                    }

                    const json2 = await response2.json();
                    
                    if(!response2.ok) {
                        setIsLoading(false)
                        setError(json2.error)
                    }   
                    // setConfirmModalOpen(false);                
                }
                else{
                    alert("You are not at your trip destination!");
                    // setConfirmModalOpen(false);
                }
                 setConfirmModalOpen(false);
            }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude +
            " Longitude: " + position.coords.longitude);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            }

  return (
  
      <div className='grid-container-tasks' key={props.user_id}>
                        <div className='grid-item-tasks-title' >
                            {props.tripName}
                            </div>
                        <div className='grid-item-tasks' >{props.status}
                        </div>
                        <div className='grid-item-tasks' >{props.possiblePoints}</div>
                        <div className='grid-item-tasks' >{props.dstlatitude}</div>
                        <div className='grid-item-tasks' >{props.dstlongitude}</div>
                        <div className='grid-item-tasks-delete'>
                            <button type="button" class="edit-button" onClick={confirmHandler}>✓</button>
                        </div>
                        { confirmModalOpen && <ConfirmModal onCancel={closeModal} onConfirm={confirm} tripInfo={props}/>}
                        { confirmModalOpen && <BackDrop onCancel={closeModal}/> }
                </div>
  );
}

export default Trip;