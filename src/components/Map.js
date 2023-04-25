import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from "leaflet";
import { useState, useEffect } from "react";
import { Data } from './Database';

const tate = [33.95048417257601, -83.37506764857703];
const customIcon = new Icon({
  iconUrl: require("./Home.png"),
  iconSize: [30, 30]
});
let score = 1;

async function addTrip() {
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  console.log('position:', position);
  const local = [position.coords.latitude, position.coords.longitude];
  console.log('local:', local);
  const distance = getDistance(local, tate);
  console.log('distance:', distance);
  return distance;
}
function getDistance(p1, p2) {
  let y = Math.abs(p1[0]) - Math.abs(p2[0]);
  let x = Math.abs(p1[1]) - Math.abs(p2[1]);
  return Math.sqrt(x * x + y * y);
}

function Map() {
  const [scored, scoreChange] = useState(0);
  let use = localStorage.getItem('user');
  let id = use.slice(-26);
  id = id.substring(0, 24);

  useEffect(() => {
    fetch('http://localhost:4000/routes/user/' + id).then((res) => {
      return res.json();
    }).then((res) => {
      scoreChange(res.scored);
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tripScore = await addTrip() * 1000;
    console.log('tripScore:', tripScore);
    const newScore = scored + tripScore;
    console.log('newScore:', newScore);
    const userObj = { score: newScore };

    fetch(`http://localhost:4000/routes/user/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userObj),
    }).catch((err) => {
      console.log(err.message);
    });
    scoreChange(newScore);
  };
  return (
    <div id="mapPage">
      <h1>
        Map of home location {id}
      </h1>
      <button onClick={(e) => handleSubmit(e)}>Add Trip!</button>
      <p> Score++: {scored}</p>
      <MapContainer center={tate} zoom={13}>
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


} export default Map;