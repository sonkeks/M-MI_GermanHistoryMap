import openStreetMapImage from '@/assets/OpenStreetMap.png';
import naturalEarthImage from '@/assets/NaturalEarth.png';
import satelliteImage from '@/assets/Satellite.png';
import {pointStringToLatLngTuple} from "@/services/EventsService.ts";
import type {LatLngTuple} from "leaflet";

export type EventLocation = {
  event: {
    type: "uri";
    value: string;
  };
  eventId: {
    type: string,
    value: string,
  };
  startDate: {
    datatype: string;
    type: "literal";
    value: string;
  };
  endDate: {
    datatype: string;
    type: "literal";
    value: string;
  };
  coordinate: {
    datatype: string;
    type: "literal";
    value: "string";
  };
  image: {
    type: string,
    value: string
  }
  eventLabel: {
    "xml:lang": string;
    type: "literal";
    value: string;
  };
  eventDescription: {
    "xml:lang": string;
    type: "literal";
    value: string;
  };
  eventImage: {
    type: string,
    value: string
  }
  locationLabel: {
    "xml:lang": string;
    type: "literal";
    value: string;
  };
}

export type EventDto = {
  eventId: string;
  eventLabel: string;
  eventDescription?: string;
  eventImage?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  locations: {
    locationLabel?: string;
    coordinate: LatLngTuple;
    image?: string;
  }[];
};

export function groupEventLocations(data: EventLocation[]): EventDto[] {
  const grouped: Record<string, EventDto> = {};
  
  for (const item of data) {
    const id = item.eventId.value;
    try {
      if (!grouped[id]) {
        grouped[id] = {
          eventId: id,
          eventLabel: item.eventLabel.value,
          eventDescription: item.eventDescription ? item.eventDescription.value : "",
          eventImage: item.eventImage && item.eventImage.type === "uri" ? item.eventImage.value : undefined,
          startDate: item.startDate ? item.startDate.value : undefined,
          endDate: item.endDate ? item.endDate.value : undefined,
          image: item.image && item.image.type === "uri" ? item.image.value : undefined,
          locations: [],
        };
      }
      
      // Only add location if coordinate or locationLabel exists
      if (item.coordinate?.value) {
        grouped[id].locations.push({
          locationLabel: item.locationLabel?.value,
          coordinate: pointStringToLatLngTuple(item.coordinate.value),
          image: item.image?.value,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  return Object.values(grouped);
}

export type HistoricEvent = {
  label: string;
  id: string;
  year: string;
  wikiTitle?: string;
}

export type HistoricCollection = {
  id: string,
  title: string,
  description: string,
  startDate: Date,
  historicEvents: HistoricEvent['id'][],
  wikiTitle: string,
}

export type SortOrder = 'ASC' | 'DESC';

export type MapStyle = {
  url: string;
  attribution: string;
  name: string;
  image: string,
};

// TODO: Adjust Attributions before going public

export const MAP_STYLES: Record<string, MapStyle> = {
  openStreetMap: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: 'Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    name: 'Open Street Map',
    image: openStreetMapImage
  },
  naturalEarth: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    name: 'Natural Earth',
    image: naturalEarthImage,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    name: 'Satellite',
    image: satelliteImage,
  },
};

export type MapStyleKey = keyof typeof MAP_STYLES;

export type Category = 'EVENTS' | 'COLLECTIONS';
