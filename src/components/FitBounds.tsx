import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {LatLngBounds, type LatLngTuple} from "leaflet";

interface FitBoundsProps {
  markerPositions: LatLngTuple[]; // array of [lat, lng] tuples
}

function FitBounds({ markerPositions }: FitBoundsProps) {
  const map = useMap();
  
  useEffect(() => {
    if (markerPositions.length === 0) return;
    
    const bounds = new LatLngBounds(markerPositions);
    map.fitBounds(bounds, { paddingTopLeft: [350, 50], paddingBottomRight: [50, 50], maxZoom: 15 }); // padding optional
  }, [map, markerPositions]);
  
  return null; // This is a purely functional helper
}

export default FitBounds;
