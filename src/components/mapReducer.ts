import type {EventDto, HistoricCollection, HistoricEvent, MapStyleKey, SortOrder} from "@/components/types.ts";
import {historicCollections, historicEvents} from "@/components/data.ts";

export type MapAction =
  | { type: "SELECT_MAPSTYLE"; payload: { key: MapStyleKey }}
  | { type: "SELECT_EVENT"; payload: { eventId: string } }
  | { type: "CLEAR_EVENT" }
  | { type: "SELECT_COLLECTION"; payload: { collectionId: string }}
  | { type: "CLEAR_COLLECTION"}
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_IS_LOADING"; payload: boolean }
  | { type: "UPDATE_DISPLAYED_EVENTS"; payload: {sortOrder: SortOrder, events: EventDto[]} }
  | { type: "CLEAR_DISPLAYED_EVENTS"}
  | { type: "TOGGLE_SORT_ORDER"}
  | { type: "HIGHLIGHT_LOCATIONS", payload: {eventId: string, all: boolean, locations?: string[]}}
  | { type: "CLEAR_HIGHLIGHTS"}

export type MapState = {
  mapStyle: MapStyleKey,
  currentSearchQuery: string;
  selectedEvent: HistoricEvent | undefined;
  selectedCollection: HistoricCollection | undefined;
  isLoadingEvents: boolean,
  events: EventDto[];
  sortOrder: SortOrder,
  highlightedLocations: string[],
}

export const initialMapState: MapState = {
  mapStyle: 'satellite',
  currentSearchQuery: '',
  selectedEvent: undefined,
  selectedCollection: undefined,
  isLoadingEvents: false,
  events: [],
  sortOrder: "ASC",
  highlightedLocations: []
};

function sortEvents(eventsToSort: EventDto[], sortOrder: SortOrder){
  return [...eventsToSort].sort((a, b) => {
    const dateA = a.startDate || a.endDate;
    const dateB = b.startDate || b.endDate;
    
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    const diff = dateA.getTime() - dateB.getTime();
    return sortOrder === 'ASC' ? diff : -diff;
  });
}

export function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case "SELECT_MAPSTYLE": {
      return { ...state, mapStyle: action.payload.key }
    }
    case "SELECT_EVENT": {
      const selectedEvent = historicEvents.find(item => item.id === action.payload.eventId);
      return { ...state, selectedEvent: selectedEvent, highlightedLocations: [] };
    }
    case "CLEAR_EVENT": {
      return {...state, selectedEvent: undefined, events: [], highlightedLocations: []};
    }
    case "SELECT_COLLECTION": {
      const selectedCollection = historicCollections.find(collection => collection.id === action.payload.collectionId);
      return { ...state, selectedCollection: selectedCollection, highlightedLocations: []}
    }
    case "CLEAR_COLLECTION": {
      return { ...state, selectedCollection: undefined, events: [], highlightedLocations: []};
    }
    case 'SET_SEARCH_QUERY': {
      return {...state, currentSearchQuery: action.payload};
    }
    case 'SET_IS_LOADING': {
      return {...state, isLoadingEvents: action.payload};
    }
    case 'UPDATE_DISPLAYED_EVENTS': {
      const sortedEvents = sortEvents(action.payload.events, action.payload.sortOrder);
      return {...state, sortOrder: action.payload.sortOrder, events: sortedEvents}
    }
    case 'CLEAR_DISPLAYED_EVENTS': {
      return { ...state, events: []}
    }
    case 'TOGGLE_SORT_ORDER': {
      const newSortOrder: SortOrder = state.sortOrder === 'ASC' ? 'DESC' : 'ASC'
      const sortedEvents = sortEvents(state.events, newSortOrder);
      return { ...state, sortOrder: newSortOrder, events: sortedEvents }
    }
    case 'HIGHLIGHT_LOCATIONS': {
      const event = state.events.find(event => event.eventId === action.payload.eventId);
      if (!event) {
        return state;
      }
      if (action.payload.all) {
        return { ...state, highlightedLocations: event.locations.map(location => location.locationId)}
      }
      if (action.payload.locations) {
        const eventLocationIds = event.locations.map(location => location.locationId);
        const areValidLocations = action.payload.locations.every(
          locationId => eventLocationIds.includes(locationId)
        );
        return areValidLocations
          ? { ...state, highlightedLocations: action.payload.locations }
          : state;
      }
      return state;
    }
    case 'CLEAR_HIGHLIGHTS': {
      return { ...state, highlightedLocations: []}
    }
    default:
      return state;
  }
}
