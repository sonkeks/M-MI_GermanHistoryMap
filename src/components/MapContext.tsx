import React, {createContext, type ReactNode, useReducer} from "react";
import {mapReducer, initialMapState, type MapAction, type MapState} from "./mapReducer.ts";

interface MapContextProps {
  state: MapState;
  dispatch: React.Dispatch<MapAction>;
}

export const MapContext = createContext<MapContextProps>({
  state: initialMapState,
  dispatch: () => {},
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialMapState);
  
  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
};
