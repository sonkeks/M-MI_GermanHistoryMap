import {type FunctionComponent, useContext, useEffect, useState} from "react";
import {Box, Table} from "@chakra-ui/react";
import {historicEvents} from "@/components/data.ts";
import { TbChevronRight } from "react-icons/tb";
import "./Events.css";
import {MapContext} from "@/components/MapContext.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import type {HistoricEvent} from "@/components/types.ts";
import {useSearch} from "@/hooks/useSearch.ts";

export const Events: FunctionComponent = () => {
  const {state, dispatch} = useContext(MapContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState<HistoricEvent[]>([]);
  const {searchValue} = useSearch();
  
  // TODO: Outsource and Generalise Search Logic
  
  useEffect(() => {
    let events = historicEvents;
    if (searchValue !== "") {
      events = events.filter(item => item.label.includes(searchValue));
    }
    setEvents(events);
  }, [searchValue]);
  
  const handleEventSelect = (eventId: string) => {
    dispatch({ type: "SELECT_EVENT", payload: {eventId: eventId}});
    navigate(`/events/${eventId}${location.search}`);
  }
  
  return (
    <Box>
      <Table.Root size="md" interactive>
       <Table.Body>
         {events.map(historicEvent => (
           <Table.Row data-selected={state.selectedEvent?.id === historicEvent.id ? "" : undefined} className="events-table-row" key={historicEvent.id} onClick={() => handleEventSelect(historicEvent.id)}>
             <Table.Cell>{historicEvent.label}</Table.Cell>
             <Table.Cell>{historicEvent.year}</Table.Cell>
             <Table.Cell>
               <TbChevronRight />
             </Table.Cell>
           </Table.Row>
         ))}
       </Table.Body>
      </Table.Root>
    </Box>
  )
}
