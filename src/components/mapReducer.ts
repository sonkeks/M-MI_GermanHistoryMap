import type {HistoricCollection, HistoricEvent} from "@/components/types.ts";
import {collections, historicEvents} from "@/components/data.ts";

export type MapAction =
  | { type: "SELECT_EVENT"; payload: { eventId: string } }
  | { type: "CLEAR_EVENT" }
  | { type: "SELECT_COLLECTION"; payload: { collectionId: string }}
  | { type: "CLEAR_COLLECTION"}
  | { type: 'SET_SEARCH_QUERY'; payload: string }

export type MapState = {
  currentSearchQuery: string;
  selectedEvent: HistoricEvent | null;
  selectedCollection: HistoricCollection | null;
}

export const initialMapState: MapState = {
  currentSearchQuery: '',
  selectedEvent: null,
  selectedCollection: null
};

export function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case "SELECT_EVENT": {
      const selectedEvent = historicEvents.find(item => item.id === action.payload.eventId) || null;
      return { ...state, selectedEvent: selectedEvent };
    }
    case "CLEAR_EVENT":
      return { ...state, selectedEvent: null };
    case "SELECT_COLLECTION": {
      const selectedCollection = collections.find(collection => collection.id === action.payload.collectionId) || null;
      return { ...state, selectedEvent: null, selectedCollection: selectedCollection}
    }
    case "CLEAR_COLLECTION": {
      return initialMapState;
    }
    case 'SET_SEARCH_QUERY':
      return {...state, currentSearchQuery: action.payload,
      };
    default:
      return state;
  }
}
