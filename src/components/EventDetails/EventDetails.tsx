import {type FunctionComponent, useContext, useEffect} from "react";
import {Box, Heading, Text} from "@chakra-ui/react";
import "./EventDetails.css";
import {Link, useLocation, useParams} from "react-router-dom";
import {historicEvents} from "@/components/data.ts";
import {MapContext} from "@/components/MapContext.tsx";
import { TbChevronLeft } from "react-icons/tb";

export const EventDetails: FunctionComponent = () => {
  const {eventId} = useParams();
  const { dispatch } = useContext(MapContext);
  const location = useLocation();
  
  const historicEvent = historicEvents.find(item => item.id === eventId);
  
  useEffect(() => {
    if (historicEvent) {
      dispatch({ type: "SELECT_EVENT", payload: {eventId: historicEvent.id}})
    }
  }, []);
  
  if (!historicEvent) {
    console.error("Event Not Found");
    return;
  }
  
  return (
    <Box className="container">
      <Link to={`/events${location.search}`} replace className="back-link" onClick={() => dispatch({type: 'CLEAR_EVENT'})}>
        <TbChevronLeft size={20}/>
        Events
      </Link>
      <Heading>{historicEvent.label}</Heading>
      <Text>{historicEvent.year}</Text>
    </Box>
  )
}
