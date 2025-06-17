import React, {createContext, type ReactNode, useEffect, useReducer} from "react";
import {mapReducer, initialMapState, type MapAction, type MapState} from "./mapReducer.ts";
import {useGetEventLocations} from "@/hooks/useGetEventLocations.ts";
import type {EventLocation, RestructuredEvent} from "@/components/types.ts";
import {useGetEventRecords} from "@/hooks/useGetEventRecords.ts";

interface MapContextProps {
  state: MapState;
  dispatch: React.Dispatch<MapAction>;
  eventLocations: EventLocation[],
  eventRecords: RestructuredEvent[],
  loading: boolean,
}

export const MapContext = createContext<MapContextProps>({
  state: initialMapState,
  dispatch: () => {},
  eventLocations: [],
  eventRecords: [],
  loading: false
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialMapState);
  const { eventLocations, loading, updateSelection } = useGetEventLocations();
  const { eventRecords, updateSelections } = useGetEventRecords();
  
  useEffect(() => {
    updateSelections(state.selectedCollection?.historicEvents || null);
  }, [state.selectedCollection]);
  
  useEffect(() => {
    updateSelection(state.selectedEvent?.id || null);
  }, [state.selectedEvent])
  
  return (
    <MapContext.Provider value={{ state, dispatch, eventLocations, eventRecords, loading }}>
      {children}
    </MapContext.Provider>
  );
};
