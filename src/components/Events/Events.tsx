import {type FunctionComponent, useEffect, useState} from "react";
import {Box, EmptyState, Table, VStack} from "@chakra-ui/react";
import {historicEvents} from "@/components/data.ts";
import {TbChevronRight, TbSearchOff} from "react-icons/tb";
import "./Events.css";
import {useLocation, useNavigate} from "react-router-dom";
import {type HistoricEvent} from "@/components/types.ts";
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
      <Table.Root size="md" interactive stickyHeader>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Event</Table.ColumnHeader>
            <Table.ColumnHeader className="icon-cell">Year</Table.ColumnHeader>
            <Table.ColumnHeader className="icon-cell"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
       <Table.Body>
         {events.map(historicEvent => (
           <Table.Row className="events-table-row" key={historicEvent.id} onClick={() => handleEventSelect(historicEvent.id)}>
             <Table.Cell>{historicEvent.label}</Table.Cell>
             <Table.Cell className="icon-cell">{historicEvent.year}</Table.Cell>
             <Table.Cell className="icon-cell">
               <TbChevronRight />
             </Table.Cell>
           </Table.Row>
         ))}
       </Table.Body>
      </Table.Root>
      {events.length === 0 && searchValue !== "" && (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <TbSearchOff />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>No Search Results</EmptyState.Title>
              <EmptyState.Description style={{maxWidth: '200px'}}>
                Sorry, your query did not find any Events in the List
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
    </Box>
  )
}
