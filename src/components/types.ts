import openStreetMapImage from '@/assets/OpenStreetMap.png';
// import naturalEarthImage from '@/assets/NaturalEarth.png';
// import satelliteImage from '@/assets/Satellite.png';
import {pointStringToLatLngTuple} from "@/services/EventsService.ts";
import type {LatLngTuple} from "leaflet";
import {getDateFormat, parseDate} from "@/utility/dateHelper.ts";
import {capitalizeFirst} from "@/utility/stringHelpers.ts";

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
  locationId: {
    type: string,
    value: string,
  };
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
  startDate?: Date;
  endDate?: Date;
  displayDate: string;
  image?: string;
  locations: {
    locationId: string,
    locationLabel?: string;
    coordinate: LatLngTuple;
    image?: string;
  }[];
};

export function groupEventLocations(data: EventLocation[]): EventDto[] {
  const grouped: Record<string, EventDto> = {};
  
  for (const item of data) {
    const id = item.eventId.value;
    const seenLocations = new Set<string>();
    try {
      if (!grouped[id]) {
        grouped[id] = {
          eventId: id,
          eventLabel: capitalizeFirst(item.eventLabel ? item.eventLabel.value : undefined),
          eventDescription: capitalizeFirst(item.eventDescription ? item.eventDescription.value : undefined),
          eventImage: item.eventImage && item.eventImage.type === "uri" ? item.eventImage.value : undefined,
          startDate: parseDate(item.startDate ? item.startDate.value : undefined),
          endDate: parseDate(item.endDate ? item.endDate.value : undefined),
          displayDate: getDateFormat(
            item.startDate ? item.startDate.value : undefined,
            item.endDate ? item.endDate.value : undefined
          ),
          image: item.image && item.image.type === "uri" ? item.image.value : undefined,
          locations: [],
        };
      }
      
      // Only add location if coordinate exists
      if (item.coordinate?.value && grouped[id] && !seenLocations.has(item.locationId.value)) {
        grouped[id].locations.push({
          locationId: item.locationId.value,
          locationLabel: capitalizeFirst(item.locationLabel ? item.locationLabel.value : undefined),
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
  endDate: Date,
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
    attribution: '© <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors — Data under <a target="_blank" href="https://opendatacommons.org/licenses/odbl/">ODbL</a>',
    name: 'Open Street Map',
    image: openStreetMapImage
  }/*,
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
  },*/
};

export type MapStyleKey = keyof typeof MAP_STYLES;

export type Category = 'EVENTS' | 'COLLECTIONS';
