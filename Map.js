import "./Map.css";
import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer, Marker, Popup, useMap} from'react-leaflet'
import {Icon} from "leaflet";
import { useState } from "react";

const tate = [33.95048417257601, -83.37506764857703];
const customIcon = new Icon ({
  iconUrl: require ("./Home.png"),
  iconSize: [30,30]
});
let score = 1;

function addTrip() {
    alert('You clicked me!');
    navigator.geolocation.getCurrentPosition(showPosition);
    return score;
}
function showPosition(position) {
    let local = [position.coords.latitude, position.coords.longitude];
    score = getDistance(local, tate)
    return score;
}
function getDistance(p1,p2) {
    let y = Math.abs(p1[0]) - Math.abs(p2[0]);
    let x = Math.abs(p1[1]) - Math.abs(p2[1]);
    return Math.sqrt(x * x + y * y);
}

function Map () {
    const [scored, addScore] = useState(0);
  return (
    <div id = "mapPage">
      <h1>
        Map of home location
      </h1>
      <button onClick={() => addScore (scored + addTrip()*1000)}>Add Trip!</button>
      <p> Score++: {scored}</p>
      <MapContainer center = {tate} zoom = {13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={tate} icon={customIcon}>
    <Popup>
      Home!
    </Popup>
  </Marker>
    </MapContainer>
    </div>
  );
 

}export default Map;