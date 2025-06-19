import type {HistoricCollection, HistoricEvent, MapStyleKey} from "@/components/types.ts";
import {historicCollections, historicEvents} from "@/components/data.ts";

export type MapAction =
  | { type: "SELECT_MAPSTYLE"; payload: { key: MapStyleKey }}
  | { type: "SELECT_EVENT"; payload: { eventId: string } }
  | { type: "CLEAR_EVENT" }
  | { type: "SELECT_COLLECTION"; payload: { collectionId: string }}
  | { type: "CLEAR_COLLECTION"}
  | { type: 'SET_SEARCH_QUERY'; payload: string }

export type MapState = {
  mapStyle: MapStyleKey,
  currentSearchQuery: string;
  selectedEvent: HistoricEvent | null;
  selectedCollection: HistoricCollection | null;
}

export const initialMapState: MapState = {
  mapStyle: 'satellite',
  currentSearchQuery: '',
  selectedEvent: null,
  selectedCollection: null
};

export function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case "SELECT_MAPSTYLE": {
      return { ...state, mapStyle: action.payload.key }
    }
    case "SELECT_EVENT": {
      const selectedEvent = historicEvents.find(item => item.id === action.payload.eventId) || null;
      return { ...state, selectedEvent: selectedEvent };
    }
    case "CLEAR_EVENT":
      return { ...state, selectedEvent: null };
    case "SELECT_COLLECTION": {
      const selectedCollection = historicCollections.find(collection => collection.id === action.payload.collectionId) || null;
      return { ...state, selectedCollection: selectedCollection}
    }
    case "CLEAR_COLLECTION": {
      return { ...state, selectedCollection: null};
    }
    case 'SET_SEARCH_QUERY':
      return {...state, currentSearchQuery: action.payload,
      };
    default:
      return state;
  }
}
