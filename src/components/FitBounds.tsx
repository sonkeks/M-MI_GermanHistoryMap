import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {LatLngBounds, type LatLngTuple, type PointTuple} from "leaflet";

interface FitBoundsProps {
  markerPositions: LatLngTuple[]; // array of [lat, lng] tuples
}

function FitBounds({ markerPositions }: FitBoundsProps) {
  const map = useMap();
  
  useEffect(() => {
    if (markerPositions.length === 0) return;
    
    const isMobile = window.innerWidth <= 500;
    
    const paddingTopLeft: PointTuple = isMobile ? [50, 50] : [350, 50];
    const paddingBottomRight: PointTuple = [50, 50];
    
    const bounds = new LatLngBounds(markerPositions);
    map.fitBounds(bounds, { paddingTopLeft: paddingTopLeft, paddingBottomRight: paddingBottomRight, maxZoom: 15 }); // padding optional
  }, [map, markerPositions]);
  
  return null; // This is a purely functional helper
}

export default FitBounds;
