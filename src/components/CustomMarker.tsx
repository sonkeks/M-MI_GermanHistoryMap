import { Marker } from 'react-leaflet';
import L, {type LatLngTuple} from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import type {ReactNode} from "react";

type CustomMarkerProps = {
  position: LatLngTuple;
  number?: number | string;
  color?: string;
  size?: number;
  isHighlighted?: boolean;
  children?: ReactNode;
};

export function CustomMarker({position, number, color = 'black', size = 26, isHighlighted, children}: CustomMarkerProps) {
  const height = size * 1.4;
  
  const iconMarkup = ReactDOMServer.renderToStaticMarkup(
    <div style={{
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: 'white',
      borderRadius: `${size}px ${size}px 0 ${size}px`,
      transform: `rotate(45deg) ${isHighlighted ? 'scale(1.5)' : ''}`,
      opacity: `${isHighlighted === undefined ? 1 : (isHighlighted ? 1 : 0.75)}`,
      transformOrigin: "50% 50%",
      boxShadow: '0 0 4px rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        transform: `rotate(-45deg)`,
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
    iconAnchor: [size / 2, height - (isHighlighted ? 3 : 6)],
  });
  
  return (
    <Marker position={position} icon={icon} zIndexOffset={isHighlighted ? 900 : 0}>
      {children}
    </Marker>
  );
}
