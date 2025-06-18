import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngTuple} from "leaflet";
import {MapContext} from "@/components/MapContext.tsx";
import {useContext} from "react";
import {pointStringToLatLngTuple} from "@/services/EventsService.ts";
import {Box, Heading, Stack, Text} from "@chakra-ui/react";
import "./Mapview.css";

const THUNDERFOREST_API_KEY = import.meta.env.VITE_THUNDERFOREST_API_KEY;

const MAP_STYLES = {
  thunderForest: {
    url: `https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${THUNDERFOREST_API_KEY}`,
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    name: 'Thunder Forest'
  },
  openStreetMap: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: 'Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    name: 'Open Street Map'
  },
  naturalEarth: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    name: 'Natural Earth',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    name: 'Satellite',
  },
}

const MapView = () => {
  const {eventLocations, loading} = useContext(MapContext);
  
  const center: LatLngTuple = [51.1657, 10.4515];
  const zoom = 6;
  
  return (
    <MapContainer zoomControl={false} center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={MAP_STYLES.satellite.url}
        attribution={MAP_STYLES.satellite.attribution}
      />
      <ZoomControl position='bottomright' />
      {eventLocations && !loading && eventLocations.map((location, index) => {
        return (
          <Marker key={index} position={pointStringToLatLngTuple(location.coordinate.value)}>
            <Popup className="custom-popup">
                <Stack>
                  {location.image && location.image.type === 'uri'
                    ? <img
                      src={location.image.value + '?width=500'}
                      alt={`Image of ${location.locationLabel.value}`}
                      className="image-container"
                    />
                    : <div className="image-container image-placeholder"></div>
                  }
                  <Box className="popup-location-info-container">
                    <Heading mt="0" lineHeight="1" size="md">{location.locationLabel.value}</Heading>
                    <Text m="0!" color="gray.500" fontWeight="500">{location.eventLabel.value}</Text>
                    <Text mt="2!" textStyle="sm">{location.eventDescription.value}</Text>
                  </Box>
                </Stack>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
};

export default MapView;
