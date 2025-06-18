import {
  groupEventLocations,
  type HistoricEvent,
  type RestructuredEvent
} from "@/components/types.ts";
import { useEffect, useState } from "react";
import { getEventsData } from "@/services/EventsService.ts";

export function useGetEventRecords() {
  const [eventRecords, setEventRecords] = useState<RestructuredEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedIds, setSelectedIds] = useState<HistoricEvent['id'][]>([]);
  
  useEffect(() => {
    async function loadData() {
      if (selectedIds.length > 0) {
        setLoading(true);
        try {
          const allResults = await getEventsData(selectedIds);
          const restructuredEvents = groupEventLocations(allResults);
          setEventRecords(restructuredEvents);
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
  
  return { eventRecords, loadingEventRecords: loading, error, updateSelections };
}
