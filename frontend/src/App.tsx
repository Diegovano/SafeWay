// import './App.css'
import { LatLng } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from 'react'
import { getCrimeData } from "./api";

interface MarkerData {
  id: number,
  // location: LatLng
  latitude: number,
  longitude: number,
}

function App() {
  const position = new LatLng(51.505, -0.09);
  const marker_position = new LatLng(51.505, -0.09);

  const sample: MarkerData = { id: 0, latitude: 0, longitude: 0 };
  const [crimeLocations, _setCrimeLocations] = useState([sample]);

  useEffect(() => {
    getCrimeData().then(json => {
      // setCrimeLocations(json);
    }, err => {
      console.log(err.message);
    })
  }, []);

  return (
    <>
      <div>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ minHeight: "100vh", minWidth: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {
            crimeLocations.map((item: MarkerData, _index) => {
              <Marker position={new LatLng(item.latitude, item.longitude)}>
                <Popup>
                  {item.id}
                </Popup>
              </Marker>
            })
          }
          <Marker position={new LatLng(55, 0)}>
            <Popup>
              item.id
            </Popup>
          </Marker>
        </MapContainer>


        <h1>
          Map
        </h1>
        <div id="map"></div>
      </div>
    </>
  )
}

export default App;
