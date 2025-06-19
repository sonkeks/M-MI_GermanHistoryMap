import React, {createContext, type Dispatch, type ReactNode, type SetStateAction, useEffect, useReducer} from "react";
import {mapReducer, initialMapState, type MapAction, type MapState} from "./mapReducer.ts";
import type {EventDto} from "@/components/types.ts";
import {useGetEvents} from "@/hooks/useGetEvents.ts";

interface MapContextProps {
  state: MapState;
  dispatch: React.Dispatch<MapAction>;
  events: EventDto[],
  loading: boolean,
  sortOrder: 'ASC' | 'DESC',
  setSortOrder: Dispatch<SetStateAction<'ASC' | 'DESC'>>,
}

export const MapContext = createContext<MapContextProps>({
  state: initialMapState,
  dispatch: () => {},
  events: [],
  loading: false,
  sortOrder: 'ASC',
  setSortOrder: () => {},
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialMapState);
  const { events, loading, updateSelection, sortOrder, setSortOrder } = useGetEvents();
  
  useEffect(() => {
    if (state.selectedEvent) {
      updateSelection([state.selectedEvent.id]);
    } else if (state.selectedCollection) {
      updateSelection(state.selectedCollection.historicEvents)
    } else {
      updateSelection([]);
    }
  }, [state.selectedEvent, state.selectedCollection])
  
  return (
    <MapContext.Provider value={{ state, dispatch, events, loading, sortOrder, setSortOrder }}>
      {children}
    </MapContext.Provider>
  );
};
