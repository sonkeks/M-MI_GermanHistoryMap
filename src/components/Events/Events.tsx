import {type FunctionComponent, useContext} from "react";
import {Box, Table} from "@chakra-ui/react";
import {historicEvents} from "@/components/data.ts";
import { TbChevronRight } from "react-icons/tb";
import "./Events.css";
import {EventContext} from "@/components/EventContext.tsx";
import {useNavigate} from "react-router-dom";

export const Events: FunctionComponent = () => {
  const {state, dispatch} = useContext(EventContext);
  const navigate = useNavigate();
  
  const handleEventSelect = (eventId: string) => {
    dispatch({ type: "SELECT_EVENT", payload: {eventId: eventId}});
    navigate(`/events/${eventId}`);
  }
  
  return (
    <Box>
      <Table.Root size="md" interactive>
       <Table.Body>
         {historicEvents.map(historicEvent => (
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
