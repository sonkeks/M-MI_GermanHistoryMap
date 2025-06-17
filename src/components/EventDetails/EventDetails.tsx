import {type FunctionComponent, useContext, useEffect} from "react";
import {Box, Flex, Heading, Text, Link as ChakraLink, Stack} from "@chakra-ui/react";
import "./EventDetails.css";
import {Link, useLocation, useParams} from "react-router-dom";
import {historicEvents} from "@/components/data.ts";
import {MapContext} from "@/components/MapContext.tsx";
import {TbChevronLeft, TbExternalLink} from "react-icons/tb";
import {useGetEventDetails} from "@/hooks/useGetEventDetails.ts";

export const EventDetails: FunctionComponent = () => {
  const {eventId} = useParams();
  const { dispatch } = useContext(MapContext);
  const location = useLocation();
  const {eventDetails, loading} = useGetEventDetails(eventId!);
  
  const historicEvent = historicEvents.find(item => item.id === eventId);
  
  useEffect(() => {
    if (historicEvent) {
      dispatch({ type: "SELECT_EVENT", payload: {eventId: historicEvent.id}})
    }
  }, []);
  
  return (
    <Box>
      <Flex className="navigation-bar" alignItems="center" justifyContent="space-between">
        <Link to={`/events${location.search}`} replace className="back-link" onClick={() => dispatch({type: 'CLEAR_EVENT'})}>
          <TbChevronLeft size={20}/>
          Events
        </Link>
        {eventDetails?.content_urls && (
          <ChakraLink href={eventDetails.content_urls.desktop.page} target="_blank">
            Read More
            <TbExternalLink />
          </ChakraLink>
        )}
      </Flex>
      {!loading && eventDetails && (
        <>
          <img className="header-image" src={eventDetails?.thumbnail?.source} alt={`Image of ${eventDetails?.title}`}/>
          <Stack className="container">
            <Heading>{eventDetails?.title}</Heading>
            <Text>{eventDetails?.extract}</Text>
          </Stack>
        </>
      )}
    </Box>
  )
}
