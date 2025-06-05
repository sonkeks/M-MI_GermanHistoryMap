import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngTuple} from "leaflet";
import {useGetEventData} from "@/hooks/useGetEventData.ts";
import {EventContext} from "@/components/EventContext.tsx";
import {useContext, useEffect} from "react";
import {pointStringToLatLngTuple} from "@/services/EventsService.ts";
import {Heading, HStack, Stack, Text} from "@chakra-ui/react";
import "./Mapview.css";

const THUNDERFOREST_API_KEY = import.meta.env.VITE_THUNDERFOREST_API_KEY;

const thunderforestUrl = `https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${THUNDERFOREST_API_KEY}`;
const openStreetMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MapView = () => {
  const {data, loading, updateSelection} = useGetEventData();
  const {state} = useContext(EventContext);
  
  useEffect(() => {
    updateSelection(state.selectedEvent?.id || null);
  }, [state.selectedEvent])
  
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
      {data && !loading && data.map((historicEvent, index) => {
        return (
          <Marker key={index} position={pointStringToLatLngTuple(historicEvent.coordinate.value)}>
            <Popup>
              <HStack>
                <Stack>
                  <Heading mt="2" lineHeight="1" size="md">{historicEvent.locationLabel.value}</Heading>
                  <Text m="0!" color="gray.500" fontWeight="500">{historicEvent.eventLabel.value}</Text>
                </Stack>
                <Text></Text>
              </HStack>
              <Text textStyle="sm">{historicEvent.eventDescription.value}</Text>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
};

export default MapView;
