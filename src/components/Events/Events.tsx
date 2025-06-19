import {type FunctionComponent, useEffect, useState} from "react";
import {Box, Table} from "@chakra-ui/react";
import {historicEvents} from "@/components/data.ts";
import { TbChevronRight } from "react-icons/tb";
import "./Events.css";
import {useLocation, useNavigate} from "react-router-dom";
import type {HistoricEvent} from "@/components/types.ts";
import {useSearch} from "@/hooks/useSearch.ts";
import {filterEvents} from "@/utility/searchHelper.ts";

export const Events: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState<HistoricEvent[]>([]);
  const {searchValue} = useSearch();
  
  // TODO: Outsource and Generalise Search Logic
  
  useEffect(() => {
    let events = historicEvents;
    if (searchValue !== "") {
      events = filterEvents(searchValue);
    }
    setEvents(events);
  }, [searchValue]);
  
  const handleEventSelect = (eventId: string) => {
    navigate(`/events/${eventId}${location.search}`);
  }
  
  return (
    <Box>
      <Table.Root size="md" interactive>
       <Table.Body>
         {events.map(historicEvent => (
           <Table.Row className="events-table-row" key={historicEvent.id} onClick={() => handleEventSelect(historicEvent.id)}>
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
