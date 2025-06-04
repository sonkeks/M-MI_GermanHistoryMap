import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngTuple} from "leaflet";

const THUNDERFOREST_API_KEY = import.meta.env.VITE_THUNDERFOREST_API_KEY;

const thunderforestUrl = `https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${THUNDERFOREST_API_KEY}`;
const openStreetMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MapView = () => {
  const center: LatLngTuple = [51.1657, 10.4515];
  const zoom = 6;
  const DEV = true;
  
  const tileLayerUrl = DEV ? openStreetMapUrl : thunderforestUrl;
  const attribution =
    DEV
      ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      : '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';
  
  
  return (
    <MapContainer zoomControl={false} center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={tileLayerUrl}
        attribution={attribution}
      />
      <ZoomControl position='bottomright' />
      <Marker position={center}>
        <Popup>
          Popup Content
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
