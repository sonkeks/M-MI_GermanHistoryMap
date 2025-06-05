import React, {createContext, type ReactNode, useReducer} from "react";
import {eventReducer, initialEventState, type EventAction, type EventState} from "./eventReducer";

interface EventContextProps {
  state: EventState;
  dispatch: React.Dispatch<EventAction>;
}

export const EventContext = createContext<EventContextProps>({
  state: initialEventState,
  dispatch: () => {},
});

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialEventState);
  
  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
