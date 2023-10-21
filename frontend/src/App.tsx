// import './App.css'
import { LatLng } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from 'react'
import { getCrimeData, MarkerData } from "./api";

function App() {
  const position = new LatLng(51.505, -0.09);
  // const marker_position = new LatLng(51.505, -0.09);

  const [crimeLocations, setCrimeLocations] = useState<MarkerData[]>([]);

  useEffect(() => {
    getCrimeData().then(data => {
      setCrimeLocations(data);
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

          {crimeLocations.map((item: MarkerData, _index) =>
            <Marker position={new LatLng(item.latitude, item.longitude)}>
              <Popup>
                Count: {item.count} <br></br>
                LAT: {Math.abs(item.latitude)}{item.latitude >= 0 ? 'N' : 'S'} <br></br> LON: {Math.abs(item.longitude)}{item.longitude >= 0 ? 'E' : 'W'}
              </Popup>
            </Marker>
          )}
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
