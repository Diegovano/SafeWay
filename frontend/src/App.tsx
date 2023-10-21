// import './App.css'
import * as L from "leaflet"
import "leaflet.heat"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from 'react'
import { getCrimeData, MarkerData } from "./api";
import './utils'
// import { checkInBox, viewportBoundaries } from "./utils";

// function Map() {
//   const position = new L.LatLng(51.505, -0.09);
//   useEffect(() => {
//     let map = L.map("map").setView(position, 12);

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
//   }, [])

//   return <div id="map" style={{ minHeight: "100vh", minWidth: "100vw" }}></div>;
// }

function HeatmapLayer({ crimeLocations }: { crimeLocations: MarkerData[] }) {
  const map = useMap()

  const heatMapOptions: L.HeatMapOptions = { blur: 10, maxZoom: 18, radius: 25 }
  // const heatMapOptions: L.HeatMapOptions = {}

  useEffect(() => {
    const points = crimeLocations
      ? crimeLocations.map((p) => {
        const tuple: L.HeatLatLngTuple = [p.latitude, p.longitude, p.count / 10]
        return tuple; // lat lng intensity
      })
      : [];

    L.heatLayer(points, heatMapOptions).addTo(map);
  }, [crimeLocations]);

  return null;
}

function MarkersLayer({ crimeLocations }: { crimeLocations: MarkerData[] }, bounds: viewportBoundaries) {
  const map = useMap();
  let markers = crimeLocations.map((item: MarkerData, index) => {
    let position = new L.LatLng(item.latitude, item.longitude)
    if (map.getBounds().contains(position)) {
      return (
        <Marker key={index} position={new L.LatLng(item.latitude, item.longitude)} opacity={0} >
          <Popup>
            Count: {item.count} <br></br>
            LAT: {Math.abs(item.latitude)}{item.latitude >= 0 ? 'N' : 'S'} <br></br> LON: {Math.abs(item.longitude)}{item.longitude >= 0 ? 'E' : 'W'}
          </Popup>
        </Marker>)
    } else {
      return (<></>);
    }
  })

  if (markers.length > 2000) {
    return [(
      <h1>Too many markers in view! There are {markers.length} in the viewport, please reduce to less than 2000.</h1>
    )]
  } else {
    return markers;
  }
}

function App() {
  const position = new L.LatLng(51.505, -0.09);
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
        <h1>
          Map
        </h1>
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

          <MarkersLayer crimeLocations={crimeLocations} />
          <Marker position={new L.LatLng(55, 0)}>
            <Popup>
              item.id
            </Popup>
          </Marker>
          <HeatmapLayer crimeLocations={crimeLocations} />
        </MapContainer>
      </div>
    </>
  )
}

export default App;
