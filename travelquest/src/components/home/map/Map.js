import React from 'react';
import {GoogleMap, MarkerF} from '@react-google-maps/api';
import "./Map.css"
import { useAuthContext } from '../../hooks/useAuthContext';

const Map = (props) => {
    const {user} = useAuthContext();
    let lat=  0;
    let lng= 0;

    const locations =[
        {
            name: "New York City",
            coor: { lat:40.7128, lng: -74.0060 },
            label: "Byte's #1"
        },

        {
            name: "YellowStone Park",
            coor: { lat: 44.4280 , lng: -110.5885 },
            label: "Byte's #2"
        },

        {
            name: "San Francisco",
            coor: {lat: 37.7749, lng:-122.4194},
            label: "Byte's #3"
        },
        {
            name: "Pikes Peak",
            coor: { lat: 38.8409, lng: -105.0423},
            label: "Byte's #4"
        },
        {
            name: "Hawaii",
            coor: {lat: 19.8968, lng: -155.5828},
            label: "Byte's #5"

        },
        {
            name: "",
            coor: {lat: +lat, lng: +lng },
            label: "Destination"
        }
    ];

    let coord;


    return(
        <div>            
            <GoogleMap
                    onClick={ev => {
                        console.log("latitide = ", ev.latLng.lat());
                        console.log("longitude = ", ev.latLng.lng());
                        lat = Math.round(ev.latLng.lat()*10000)/10000;
                        lng = Math.round(ev.latLng.lng()*10000)/10000;
                        coord = {lat: +lat, lng: +lng};
                        props.setLatitude(lat);
                        props.setLongitude(lng);
                    }}
                    center={props.center}
                    zoom={props.zoom}
                    mapContainerClassName="google-map"
                >

            {user && (
                <MarkerF position={props.center} label={{text: "Home",fontSize: "20px",
                              fontWeight: "bold",
                              color:'black', 
                              className: "markerLabel"
                              }} ></MarkerF>
            )}
            {locations.map((location, index) => (
                <MarkerF position={location.coor} key={index} label={{text: location.label + ", "+location.name ,className: "markerLabel" }} ></MarkerF>
            ))}
            </GoogleMap>
                
        
         </div>
        );
    }

export default Map;
