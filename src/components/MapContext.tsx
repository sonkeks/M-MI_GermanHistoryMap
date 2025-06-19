import React, {createContext, type Dispatch, type ReactNode, type SetStateAction, useEffect, useReducer} from "react";
import {mapReducer, initialMapState, type MapAction, type MapState} from "./mapReducer.ts";
import {useGetEventLocations} from "@/hooks/useGetEventLocations.ts";
import type {EventLocation, RestructuredEvent} from "@/components/types.ts";
import {useGetEventRecords} from "@/hooks/useGetEventRecords.ts";

interface MapContextProps {
  state: MapState;
  dispatch: React.Dispatch<MapAction>;
  eventLocations: EventLocation[],
  eventRecords: RestructuredEvent[],
  loadingEvent: boolean,
  loadingEventRecords: boolean,
  sortOrder: 'ASC' | 'DESC',
  setSortOrder: Dispatch<SetStateAction<'ASC' | 'DESC'>>,
}

export const MapContext = createContext<MapContextProps>({
  state: initialMapState,
  dispatch: () => {},
  eventLocations: [],
  eventRecords: [],
  loadingEvent: false,
  loadingEventRecords: false,
  sortOrder: 'ASC',
  setSortOrder: () => {},
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialMapState);
  const { eventLocations, loadingEvent, updateSelection } = useGetEventLocations();
  const { eventRecords, loadingEventRecords, updateSelections, sortOrder, setSortOrder } = useGetEventRecords();
  
  useEffect(() => {
    updateSelections(state.selectedCollection?.historicEvents || null);
  }, [state.selectedCollection]);
  
  useEffect(() => {
    updateSelection(state.selectedEvent?.id || null);
  }, [state.selectedEvent])
  
  return (
    <MapContext.Provider value={{ state, dispatch, eventLocations, eventRecords, loadingEvent, loadingEventRecords, sortOrder, setSortOrder }}>
      {children}
    </MapContext.Provider>
  );
};
