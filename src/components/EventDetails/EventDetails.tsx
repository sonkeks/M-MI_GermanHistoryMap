import {type FunctionComponent, useContext, useEffect} from "react";
import {Box, Flex, Heading, Text, Link as ChakraLink, Stack, Table, Skeleton} from "@chakra-ui/react";
import "./EventDetails.css";
import {Link, useLocation, useParams} from "react-router-dom";
import {MapContext} from "@/components/MapContext.tsx";
import {TbChevronLeft, TbChevronRight, TbExternalLink} from "react-icons/tb";
import {useGetWikiDetails} from "@/hooks/useGetWikiDetails.ts";
import {useGetEvents} from "@/hooks/useGetEvents.ts";

export const EventDetails: FunctionComponent = () => {
  const { eventId } = useParams();
  const { state, dispatch } = useContext(MapContext);
  const location = useLocation();
  const { details, loading: loadingWikiDetails } = useGetWikiDetails(eventId!, 'EVENT');
  const { updateSelection } = useGetEvents();
  
  useEffect(() => {
    if (eventId) {
      updateSelection([eventId])
      dispatch({ type: "SELECT_EVENT", payload: {eventId: eventId}})
    }
  }, []);
  
  if (loadingWikiDetails) {
    // TODO: Return Skeleton here
    return;
  }
  
  if (!state.events || state.events.length === 0) {
    return;
  }
  
  return (
    <Box>
      <Flex className="event-navigation-bar" alignItems="center" justifyContent="space-between">
        <Link to={`/events${location.search}`} replace className="back-link" onClick={() => dispatch({type: 'CLEAR_EVENT'})}>
          <TbChevronLeft size={20}/>
          Events
        </Link>
        {details?.content_urls && (
          <ChakraLink href={details.content_urls.desktop.page} target="_blank">
            Read More
            <TbExternalLink />
          </ChakraLink>
        )}
      </Flex>
      <Box className="navigation-bar-spacing"></Box>
      {!loadingWikiDetails && details && (
        <>
          <img className="header-image" src={details?.thumbnail?.source} alt={`Image of ${details?.title}`}/>
          <Stack className="container">
            <Heading>{details?.title}</Heading>
            <Text textStyle="sm">{details?.extract}</Text>
          </Stack>
        </>
      )}
      {loadingWikiDetails && (
        <>
          <Skeleton className="header-image" height="300px"></Skeleton>
          <Stack className="container">
            <Skeleton height="8"></Skeleton>
            <Skeleton height="3"></Skeleton>
            <Skeleton height="3"></Skeleton>
            <Skeleton height="3" width="50%" mb="150px"></Skeleton>
          </Stack>
        </>
      )}
      { /* TODO: Show Table Skeleton on loadingEvents */}
      <Table.Root size="md" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Location</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader className="icon-cell"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {state.events[0].locations.map((location, index) => (
            <Table.Row className="events-table-row" key={index}>
              <Table.Cell>{location.locationLabel}</Table.Cell>
              <Table.Cell>{state.events[0].endDate ? new Date(state.events[0].endDate).toLocaleDateString() : "n.d."}</Table.Cell>
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
