import {MapContainer, Popup, TileLayer, ZoomControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngTuple} from "leaflet";
import {MapContext} from "@/components/MapContext.tsx";
import {useContext, useMemo} from "react";
import {pointStringToLatLngTuple} from "@/services/EventsService.ts";
import {Box, Heading, Stack, Text} from "@chakra-ui/react";
import "./Mapview.css";
import {MAP_STYLES} from './types';
import {CustomMarker} from "@/components/CustomMarker.tsx";
import {getSeededColor} from "@/utility/colorHelper.ts";


const MapView = () => {
  const {state} = useContext(MapContext);
  
  const center: LatLngTuple = [51.1657, 10.4515];
  const zoom = 6;
  
  const eventIdToStepMap = useMemo(() => {
    const map: Record<string, number> = {};
    state.events.forEach((eventData, index) => {
      map[eventData.eventId] = state.sortOrder === 'ASC' ? index + 1 : state.events.length - index;
    });
    return map;
  }, [state.events, state.sortOrder]);
  
  const structuredEvents = state.events.flatMap(eventData =>
    eventData.locations
      .filter(location => location.coordinate)
      .map(location => ({
        ...location,
        eventId: eventData.eventId,
        eventLabel: eventData.eventLabel,
        eventDescription: eventData.eventDescription
      }))
  )
  
  const getStepNumber = (eventId: string) => eventIdToStepMap[eventId] || 0;
  
  const getColor = (eventId: string) => {
    if (state.events.length === 1) {
      return '#000000';
    }
    const stepNumber = getStepNumber(eventId);
    return getSeededColor(stepNumber, state.events.length);
  }
  
  return (
    <MapContainer zoomControl={false} center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={MAP_STYLES[state.mapStyle].url}
        attribution={MAP_STYLES[state.mapStyle].attribution}
      />
      <ZoomControl position='bottomright' />
      {state.events && !state.isLoadingEvents && structuredEvents.map((location, index) => (
        <CustomMarker key={location.eventId + index} number={state.events.length > 1 ? getStepNumber(location.eventId) : undefined} color={getColor(location.eventId)} position={pointStringToLatLngTuple(location.coordinate || "")}>
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
