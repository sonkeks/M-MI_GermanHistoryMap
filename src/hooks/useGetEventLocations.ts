import type {EventLocation, HistoricEvent} from "@/components/types.ts";
import {useEffect, useState} from "react";
import {getEventData} from "@/services/EventsService.ts";

export function useGetEventLocations () {
  const [eventLocations, setEventLocations] = useState<EventLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedId, setSelectedId] = useState<HistoricEvent['id'] | null>(null);
  
  useEffect(() => {
    async function loadData() {
      if (selectedId) {
        try {
          const results: EventLocation[] = await getEventData(selectedId);
          console.log(results);
          setEventLocations(results);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    }
    
    loadData();
  }, [selectedId]);
  
  const updateSelection = (id: HistoricEvent['id'] | null) => {
    setSelectedId(id);
  }
  
  return { eventLocations, loading, error, updateSelection };
}
