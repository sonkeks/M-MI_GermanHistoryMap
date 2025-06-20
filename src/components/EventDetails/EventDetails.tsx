import {type FunctionComponent, useContext, useEffect} from "react";
import {Box, Flex, Heading, Text, Link as ChakraLink, Stack, Table, Skeleton} from "@chakra-ui/react";
import "./EventDetails.css";
import {Link, useLocation, useParams} from "react-router-dom";
import {MapContext} from "@/components/MapContext.tsx";
import {TbChevronLeft, TbChevronRight, TbExternalLink} from "react-icons/tb";
import {useGetWikiDetails} from "@/hooks/useGetWikiDetails.ts";
import {useGetEvents} from "@/hooks/useGetEvents.ts";
import {historicCollections} from "@/components/data.ts";

export const EventDetails: FunctionComponent = () => {
  const { eventId, collectionId } = useParams();
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
  
  const showTableOfLocations = () => {
    if (state.isLoadingEvents) {
      return (
        <Table.Root size="md" interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Location</Table.ColumnHeader>
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader className="icon-cell"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: 5 }).map((_, index) => (
              <Table.Row className="events-table-row" key={index}>
                <Table.Cell><Skeleton height={5} width={200}></Skeleton></Table.Cell>
                <Table.Cell><Skeleton height={5} width={50}></Skeleton></Table.Cell>
                <Table.Cell className="icon-cell">
                  <TbChevronRight />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )
    }
    
    if (!state.events || state.events.length === 0) {
      return;
    }
    
    const handleListItemClick = (locationId: string) => {
      state.highlightedLocations.includes(locationId)
      ? dispatch({type: 'CLEAR_HIGHLIGHTS'})
      : dispatch({type: 'HIGHLIGHT_LOCATIONS', payload: {eventId: state.events[0].eventId, all: false, locations: [locationId]}});
    }
    
    return (
      <Table.Root size="md" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Location</Table.ColumnHeader>
            <Table.ColumnHeader className="icon-cell"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {state.events[0].locations.map((location, index) => (
            <Table.Row {...(state.highlightedLocations.includes(location.locationId) && { "data-selected": "true" })} className="events-table-row" key={location.locationId + "-listItem-" + index} onClick={() => handleListItemClick(location.locationId)}>
              <Table.Cell>{location.locationLabel}</Table.Cell>
              <Table.Cell className="icon-cell">
                <TbChevronRight />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    )
  }
  
  const getBackLink = () => {
    const isCollectionEvent = location.pathname.includes("collectionEvents");
    const currentCollection = historicCollections.find(collection => collection.id === collectionId);
    const url = isCollectionEvent && currentCollection ? `/collections/${collectionId}${location.search}` : `/events${location.search}`;
    return (
      <Link to={url} replace className="back-link" onClick={() => dispatch({type: 'CLEAR_EVENT'})}>
        <TbChevronLeft size={20}/>
        {isCollectionEvent && currentCollection ? currentCollection.title : "Events"}
      </Link>
    )
  }
  
  return (
    <Box>
      <Flex className="event-navigation-bar" alignItems="center" justifyContent="space-between">
        {getBackLink()}
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
            {state.isLoadingEvents ? (
              <Skeleton height={5} width={40} />
            ) : state.events.length > 0 ? (
              <Text fontSize={14} color="gray.500" fontWeight="bold">
                {state.events[0].displayDate}
              </Text>
            ) : null}
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
      {showTableOfLocations()}
    </Box>
  )
}
