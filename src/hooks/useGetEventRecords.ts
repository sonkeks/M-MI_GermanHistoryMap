import {
  groupEventLocations,
  type HistoricEvent,
  type RestructuredEvent
} from "@/components/types.ts";
import { useEffect, useState } from "react";
import { getEventsData } from "@/services/EventsService.ts";
import {getSortableDate} from "@/utility/dateHelper.ts";

export function useGetEventRecords() {
  const [eventRecords, setEventRecords] = useState<RestructuredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedIds, setSelectedIds] = useState<HistoricEvent['id'][]>([]);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [effectiveSortOrder, setEffectiveSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  
  const sortEvents = (eventRecordsToSort: RestructuredEvent[]) => {
    const sortedEvents =  [...eventRecordsToSort].sort((a, b) => {
      const dateA = getSortableDate(a.startDate, a.endDate);
      const dateB = getSortableDate(b.startDate, b.endDate);
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      const diff = dateA.getTime() - dateB.getTime();
      return sortOrder === 'ASC' ? diff : -diff;
    });
    setEventRecords(sortedEvents);
    setEffectiveSortOrder(sortOrder);
  }
  
  useEffect(() => {
    sortEvents(eventRecords);
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
        setEventRecords([]);
      }
    }
    
    loadData();
  }, [selectedIds]);
  
  const updateSelections = (ids: HistoricEvent['id'][] | null) => {
    setSelectedIds(ids ?? []);
  };
  
  return { eventRecords, loadingEventRecords: loading, error, updateSelections, sortOrder: effectiveSortOrder, setSortOrder };
}
