import React, {createContext, type ReactNode, useEffect, useReducer} from "react";
import {mapReducer, initialMapState, type MapAction, type MapState} from "./mapReducer.ts";
import {useGetEventLocations} from "@/hooks/useGetEventLocations.ts";
import type {EventLocation} from "@/components/types.ts";

interface MapContextProps {
  state: MapState;
  dispatch: React.Dispatch<MapAction>;
  eventLocations: EventLocation[],
  loading: boolean,
}

export const MapContext = createContext<MapContextProps>({
  state: initialMapState,
  dispatch: () => {},
  eventLocations: [],
  loading: false
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialMapState);
  const {eventLocations, loading, updateSelection} = useGetEventLocations();
  
  useEffect(() => {
    updateSelection(state.selectedEvent?.id || null);
  }, [state.selectedEvent])
  
  return (
    <MapContext.Provider value={{ state, dispatch, eventLocations, loading }}>
      {children}
    </MapContext.Provider>
  );
};
