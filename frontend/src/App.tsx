// import './App.css'
import * as L from "leaflet"
import "leaflet.heat"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from 'react'
import { getCrimeData, MarkerData } from "./api";

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

function MarkersLayer({ crimeLocations, setVisibleMarkers }: { crimeLocations: MarkerData[], setVisibleMarkers: React.Dispatch<React.SetStateAction<number>> }) {
  const map = useMap();
  const [filteredMarkers, setFilteredMarkers] = useState<JSX.Element[]>([]);

  useMapEvent('moveend', () => {
    const bounds = map.getBounds();
    const updatedMarkers = crimeLocations.map((item: MarkerData, index) => {
      const position = new L.LatLng(item.latitude, item.longitude);
      if (bounds.contains(position)) {
        return (
          <Marker position={position} key={index} opacity={0}>
            <Popup>
              Count: {item.count} <br></br>
              LAT: {Math.abs(item.latitude)}{item.latitude >= 0 ? 'N' : 'S'} <br></br> LON: {Math.abs(item.longitude)}{item.longitude >= 0 ? 'E' : 'W'}
            </Popup>
          </Marker >
        );
      } else {
        return null;
      }
    }).filter((element): element is JSX.Element => element !== null);
    setFilteredMarkers(updatedMarkers);
  });

  setVisibleMarkers(filteredMarkers.length);
  if (filteredMarkers.length > 2000) {
    return (
      <></>
    );
  } else {
    return <div>{filteredMarkers}</div>;
  }
}


function App() {
  const position = new L.LatLng(51.505, -0.09);

  const [crimeLocations, setCrimeLocations] = useState<MarkerData[]>([]);
  const [visibleMarkers, setVisibleMarkers] = useState(0);


  useEffect(() => {
    getCrimeData().then(data => {
      setCrimeLocations(data);
    }, err => {
      console.log(err.message);
    })
  }, [HeatmapLayer]);

  return (
    <>
      <div>
        <span>
          <h1>
            SafeWay
          </h1>
          {
            visibleMarkers >= 2000 ?
              <p>
                Too many markers in view! There are {visibleMarkers} in the viewport, please reduce to less than 2000.
              </p> :
              <p>
                Displaying {visibleMarkers} markers in the viewport.
              </p>
          }


        </span>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ minHeight: "80vh", minWidth: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkersLayer crimeLocations={crimeLocations} setVisibleMarkers={setVisibleMarkers} />
          <Marker position={new L.LatLng(55, 0)}>
            <Popup>
              item.id
            </Popup>
          </Marker>
          <HeatmapLayer crimeLocations={crimeLocations} />
        </MapContainer>
      </div>
    </>
  );
}

export default App;
