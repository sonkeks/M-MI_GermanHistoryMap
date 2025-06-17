import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type {LatLngTuple} from "leaflet";
import {useGetEventData} from "@/hooks/useGetEventData.ts";
import {MapContext} from "@/components/MapContext.tsx";
import {useContext, useEffect} from "react";
import {pointStringToLatLngTuple} from "@/services/EventsService.ts";
import {Heading, HStack, Stack, Text} from "@chakra-ui/react";
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
  const {data, loading, updateSelection} = useGetEventData();
  const {state} = useContext(MapContext);
  
  useEffect(() => {
    updateSelection(state.selectedEvent?.id || null);
  }, [state.selectedEvent])
  
  const center: LatLngTuple = [51.1657, 10.4515];
  const zoom = 6;
  
  return (
    <MapContainer zoomControl={false} center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={MAP_STYLES.satellite.url}
        attribution={MAP_STYLES.satellite.attribution}
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
