import {
  groupEventLocations,
  type HistoricEvent,
} from "@/components/types.ts";
import {useContext, useEffect, useState} from "react";
import { getEventsData } from "@/services/EventsService.ts";
import {MapContext} from "@/components/MapContext.tsx";

export function useGetEvents() {
  const { state, dispatch } = useContext(MapContext);
  const [error, setError] = useState<Error | null>(null);
  const [selectedIds, setSelectedIds] = useState<HistoricEvent['id'][]>([]);
  
  useEffect(() => {
    async function loadData() {
      if (selectedIds.length > 0) {
        dispatch({
          type: 'SET_IS_LOADING',
          payload: true
        })
        try {
          const allResults = await getEventsData(selectedIds);
          const restructuredEvents = groupEventLocations(allResults);
          dispatch({
            type: 'UPDATE_DISPLAYED_EVENTS',
            payload: {
              sortOrder: state.sortOrder,
              events: restructuredEvents
            }
          })
        } catch (err: any) {
          setError(err);
        } finally {
          dispatch({
            type: 'SET_IS_LOADING',
            payload: false
          })
        }
      } else {
        dispatch({
          type: 'CLEAR_DISPLAYED_EVENTS',
        });
      }
    }
    
    loadData();
  }, [selectedIds]);
  
  const updateSelection = (ids: HistoricEvent['id'][] | null) => {
    setSelectedIds(ids ?? []);
  };
  
  return { error, updateSelection };
}
