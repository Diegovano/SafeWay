<<<<<<< HEAD
// import './App.css'
import { LatLng } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const position = new LatLng(51.505, -0.09);
  const marker_position = new LatLng(51.505, -0.09);
  return (
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
      <Marker position={marker_position}>
        <Popup>
          Sample Marker
        </Popup>
      </Marker>
    </MapContainer>
    // <>
    //   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    //     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    //   />
    //   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    //     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    //   ></script>
    //   <div>
    //     <h1>
    //       Map
    //     </h1>
    //     <div id="map"></div>
    //   </div>
    // </>
  )
=======
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { getTest } from "./api";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [test, setTest] = useState("");

  useEffect(() => {
    const effectFunction = async () => {
      const response = await getTest();
      console.log(response);
    };

    effectFunction();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p>{test}</p>
    </>
  );
>>>>>>> 4ed36f7 (Connecting frontend to backend.)
}

export default App;
