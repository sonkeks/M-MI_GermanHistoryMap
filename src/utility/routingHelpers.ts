import type { Category } from "@/components/types";
import type {MapState} from "@/components/mapReducer.ts";

export const buildUrlForCategory = (category: Category, state?: MapState) => {
  let fullPath = "/";
  
  switch (category) {
    case "EVENTS": {
      fullPath += "events";
      if (state && state.selectedEvent?.id) {
        fullPath += `/${state.selectedEvent.id}`;
      }
      break;
    }
    case "COLLECTIONS": {
      fullPath += "collections";
      if (state && state.selectedCollection?.id) {
        fullPath += `/${state.selectedCollection.id}`;
      }
      break;
    }
    default: {
      break;
    }
  }
  
  return fullPath;
};
