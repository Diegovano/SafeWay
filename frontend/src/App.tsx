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
}

export default App
