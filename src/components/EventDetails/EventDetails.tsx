import {type FunctionComponent, useContext, useEffect} from "react";
import {Box, Flex, Heading, Text, Link as ChakraLink, Stack, Table} from "@chakra-ui/react";
import "./EventDetails.css";
import {Link, useLocation, useParams} from "react-router-dom";
import {historicEvents} from "@/components/data.ts";
import {MapContext} from "@/components/MapContext.tsx";
import {TbChevronLeft, TbChevronRight, TbExternalLink} from "react-icons/tb";
import {useGetEventDetails} from "@/hooks/useGetEventDetails.ts";

export const EventDetails: FunctionComponent = () => {
  const {eventId} = useParams();
  const { eventLocations, dispatch } = useContext(MapContext);
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
      <Box className="navigation-bar-spacing"></Box>
      {!loading && eventDetails && (
        <>
          <img className="header-image" src={eventDetails?.thumbnail?.source} alt={`Image of ${eventDetails?.title}`}/>
          <Stack className="container">
            <Heading>{eventDetails?.title}</Heading>
            <Text textStyle="sm">{eventDetails?.extract}</Text>
          </Stack>
        </>
      )}
      <Table.Root size="md" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Location</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader className="icon-cell"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {eventLocations.map((location, index) => (
            <Table.Row className="events-table-row" key={location.locationLabel.value + index}>
              <Table.Cell>{location.locationLabel.value}</Table.Cell>
              <Table.Cell>{location.endDate ? new Date(location.endDate.value).toLocaleDateString() : "n.d."}</Table.Cell>
              <Table.Cell className="icon-cell">
                <TbChevronRight />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
