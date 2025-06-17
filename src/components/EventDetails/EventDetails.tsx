import {type FunctionComponent, useContext, useEffect} from "react";
import {Box, Heading, Text} from "@chakra-ui/react";
import "./EventDetails.css";
import {useParams} from "react-router-dom";
import {historicEvents} from "@/components/data.ts";
import {EventContext} from "@/components/EventContext.tsx";

export const EventDetails: FunctionComponent = () => {
  const {eventId} = useParams();
  const { dispatch } = useContext(EventContext);
  
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
      <Heading>{historicEvent.label}</Heading>
      <Text>{historicEvent.year}</Text>
    </Box>
  )
}
