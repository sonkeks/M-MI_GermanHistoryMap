import {
  groupEventLocations,
  type HistoricEvent,
  type EventDto
} from "@/components/types.ts";
import { useEffect, useState } from "react";
import { getEventsData } from "@/services/EventsService.ts";
import { getSortableDate } from "@/utility/dateHelper.ts";

export function useGetEvents() {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedIds, setSelectedIds] = useState<HistoricEvent['id'][]>([]);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [effectiveSortOrder, setEffectiveSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  
  const sortEvents = (eventsToSort: EventDto[]) => {
    const sortedEvents =  [...eventsToSort].sort((a, b) => {
      const dateA = getSortableDate(a.startDate, a.endDate);
      const dateB = getSortableDate(b.startDate, b.endDate);
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      const diff = dateA.getTime() - dateB.getTime();
      return sortOrder === 'ASC' ? diff : -diff;
    });
    setEvents(sortedEvents);
    setEffectiveSortOrder(sortOrder);
  }
  
  useEffect(() => {
    sortEvents(events);
  }, [sortOrder]);
  
  useEffect(() => {
    async function loadData() {
      if (selectedIds.length > 0) {
        setLoading(true);
        try {
          const allResults = await getEventsData(selectedIds);
          const restructuredEvents = groupEventLocations(allResults);
          sortEvents(restructuredEvents);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setEvents([]);
      }
    }
    
    loadData();
  }, [selectedIds]);
  
  const updateSelection = (ids: HistoricEvent['id'][] | null) => {
    setSelectedIds(ids ?? []);
  };
  
  return { events, loading, error, updateSelection, sortOrder: effectiveSortOrder, setSortOrder };
}
