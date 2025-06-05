import type {HistoricEvent} from "@/components/types.ts";
import {historicEvents} from "@/components/data.ts";

export type EventAction =
  | { type: "SELECT_EVENT"; payload: { eventId: string } }
  | { type: "CLEAR_EVENT" };

export type EventState = {
  selectedEvent: HistoricEvent | null;
}

export const initialEventState: EventState = {
  selectedEvent: null,
};

export function eventReducer(state: EventState, action: EventAction): EventState {
  switch (action.type) {
    case "SELECT_EVENT": {
      const selectedEvent = historicEvents.find(item => item.id === action.payload.eventId) || null;
      return { ...state, selectedEvent: selectedEvent };
    }
    case "CLEAR_EVENT":
      return { ...state, selectedEvent: null };
    default:
      return state;
  }
}
