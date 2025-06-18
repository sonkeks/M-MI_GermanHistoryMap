import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngTuple} from "leaflet";
import {MapContext} from "@/components/MapContext.tsx";
import {useContext} from "react";
import {pointStringToLatLngTuple} from "@/services/EventsService.ts";
import {Box, Heading, Stack, Text} from "@chakra-ui/react";
import "./Mapview.css";
import { MAP_STYLES } from './types';


const MapView = () => {
  const {eventLocations, loading, state} = useContext(MapContext);
  
  const center: LatLngTuple = [51.1657, 10.4515];
  const zoom = 6;
  
  return (
    <MapContainer zoomControl={false} center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={MAP_STYLES[state.mapStyle].url}
        attribution={MAP_STYLES[state.mapStyle].attribution}
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
