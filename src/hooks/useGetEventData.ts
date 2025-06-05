import type {HistoricEvent} from "@/components/types.ts";
import {useEffect, useState} from "react";
import {type EventDetails, getEventData} from "@/services/EventsService.ts";

export function useGetEventData () {
  const [data, setData] = useState<EventDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedId, setSelectedId] = useState<HistoricEvent['id'] | null>(null);
  
  useEffect(() => {
    async function loadData() {
      if (selectedId) {
        try {
          const results: EventDetails[] = await getEventData(selectedId);
          console.log(results);
          setData(results);
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
  
  return { data, loading, error, updateSelection };
}
