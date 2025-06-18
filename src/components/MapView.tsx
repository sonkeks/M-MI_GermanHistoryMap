import {MapContainer, TileLayer, Popup, ZoomControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngTuple} from "leaflet";
import {MapContext} from "@/components/MapContext.tsx";
import {useContext} from "react";
import {pointStringToLatLngTuple} from "@/services/EventsService.ts";
import {Box, Heading, Stack, Text} from "@chakra-ui/react";
import "./Mapview.css";
import {MAP_STYLES} from './types';
import {CustomMarker} from "@/components/CustomMarker.tsx";


const MapView = () => {
  const {eventLocations, eventRecords, loadingEvent, loadingEventRecords, state} = useContext(MapContext);
  
  const center: LatLngTuple = [51.1657, 10.4515];
  const zoom = 6;
  
  const allEventLocations = eventRecords.flatMap(event =>
    event.locations
      .filter(location => location.coordinate)
      .map(location => ({
        ...location,
        eventId: event.eventId,
        eventLabel: event.eventLabel,
        eventDescription: event.eventDescription
      }))
  )
  
  // Use CircleMarker with Number corresponding to the Timeline.
  // Make Timeline follow a color palette that is applied to the markers.
  
  return (
    <MapContainer zoomControl={false} center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={MAP_STYLES[state.mapStyle].url}
        attribution={MAP_STYLES[state.mapStyle].attribution}
      />
      <ZoomControl position='bottomright' />
      {eventLocations && !loadingEvent && eventLocations.map((location, index) => {
        return (
          <CustomMarker key={index} position={pointStringToLatLngTuple(location.coordinate.value)}>
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
          </CustomMarker>
        )
      })}
      {eventRecords && !loadingEventRecords && allEventLocations.map((location, index) => (
        <CustomMarker key={location.eventId + index} number={index + 1} position={pointStringToLatLngTuple(location.coordinate || "")}>
          <Popup className="custom-popup">
            <Stack>
              {location.image
                ? <img
                  src={location.image + '?width=500'}
                  alt={`Image of ${location.locationLabel}`}
                  className="image-container"
                />
                : <div className="image-container image-placeholder"></div>
              }
              <Box className="popup-location-info-container">
                <Heading mt="0" lineHeight="1" size="md">{location.locationLabel}</Heading>
                <Text m="0!" color="gray.500" fontWeight="500">{location.eventLabel}</Text>
                <Text mt="2!" textStyle="sm">{location.eventDescription}</Text>
              </Box>
            </Stack>
          </Popup>
        </CustomMarker>
      ))}
    </MapContainer>
  );
};

export default MapView;
