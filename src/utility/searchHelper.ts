import type {HistoricCollection, HistoricEvent} from "@/components/types.ts";
import {historicCollections, historicEvents} from "@/components/data.ts";

export function filterCollections(
  searchValue: string
): HistoricCollection[] {
  if (!searchValue) return historicCollections;
  
  const query = searchValue.trim().toLowerCase();
  
  return historicCollections.filter((collection) => {
    const matchesTitle = collection.title.toLowerCase().includes(query);
    const matchesDescription = collection.description
      .toLowerCase()
      .includes(query);
    const matchesStartDateYear = collection.startDate
      .getFullYear()
      .toString()
      .includes(query);
    
    const events = historicEvents.filter((ev) =>
      collection.historicEvents.includes(ev.id)
    );
    
    const matchesEvents = events.some(
      (ev) =>
        ev.label.toLowerCase().includes(query) || ev.year.includes(query)
    );
    
    return matchesTitle || matchesDescription || matchesStartDateYear || matchesEvents;
  });
}

export function filterEvents(
  searchValue: string
): HistoricEvent[] {
  if (!searchValue) return historicEvents;
  
  const query = searchValue.trim().toLowerCase();
  
  return historicEvents.filter((ev) => {
    const matchesLabel = ev.label.toLowerCase().includes(query);
    const matchesYear = ev.year.includes(query);
    return matchesLabel || matchesYear;
  });
}

