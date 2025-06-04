import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngTuple} from "leaflet";

// ⚠️ Replace with your actual API key
const THUNDERFOREST_API_KEY = import.meta.env.VITE_THUNDERFOREST_API_KEY;

const thunderforestUrl = `https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${THUNDERFOREST_API_KEY}`;
const openStreetMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MapView = () => {
  const center: LatLngTuple = [51.505, -0.09]; // Example: London
  const zoom = 13;
  const DEV = true;
  
  const tileLayerUrl = DEV ? openStreetMapUrl : thunderforestUrl;
  const attribution =
    DEV
      ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      : '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
  
  
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={tileLayerUrl}
        attribution={attribution}
      />
      <Marker position={center}>
        <Popup>
          Popup Content
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
