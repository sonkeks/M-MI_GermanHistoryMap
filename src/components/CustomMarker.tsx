import { Marker } from 'react-leaflet';
import L, {type LatLngTuple} from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import type {ReactNode} from "react";

type CustomMarkerProps = {
  position: LatLngTuple;
  number?: number | string;
  color?: string;
  size?: number;
  children?: ReactNode;
};

export function CustomMarker({position, number, color = 'black', size = 26, children}: CustomMarkerProps) {
  const height = size * 1.4;
  
  const iconMarkup = ReactDOMServer.renderToStaticMarkup(
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: 'white',
      borderRadius: `${size}px ${size}px 0 ${size}px`,
      transform: 'rotate(45deg)',
      boxShadow: '0 0 4px rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }}>
      <div style={{
        transform: 'rotate(-45deg)',
        color: 'white',
        backgroundColor: color,
        width: `${size - (number ? 6 : 12)}px`,
        height: `${size - (number ? 6 : 12)}px`,
        borderRadius: `${size - (number ? 6 : 12)}px`,
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: `${size * 0.5}px`,
        position: 'absolute',
      }}>
        {number ? number : ""}
      </div>
    </div>
  );
  
  const icon = L.divIcon({
    html: iconMarkup,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, height - 6],
  });
  
  return (
    <Marker position={position} icon={icon}>
      {children}
    </Marker>
  );
}
