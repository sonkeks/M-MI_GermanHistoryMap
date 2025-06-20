import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  Text,
  Tabs,
  Timeline,
  Button,
  HoverCard,
  Portal,
  Skeleton
} from "@chakra-ui/react";
import {type FunctionComponent, useContext, useEffect, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {
  TbCarouselVertical,
  TbChevronDown,
  TbChevronLeft,
  TbChevronUp,
  TbGitCommit,
  TbInfoCircle,
} from "react-icons/tb";
import {MapContext} from "@/components/MapContext.tsx";
import {useGetWikiDetails} from "@/hooks/useGetWikiDetails.ts";
import "./CollectionDetails.css";
import {useGetEvents} from "@/hooks/useGetEvents.ts";
import {historicCollections} from "@/components/data.ts";
import type {EventDto} from "@/components/types.ts";
import {TimelineItem} from "@/components/CollectionDetails/TimelineItem.tsx";
import {EventCard} from "@/components/CollectionDetails/EventCard.tsx";

export const CollectionDetails: FunctionComponent = () => {
  const { collectionId } = useParams();
  const { state, dispatch } = useContext(MapContext);
  const {details, loading} = useGetWikiDetails(collectionId!, 'COLLECTION');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { updateSelection } = useGetEvents();
  
  useEffect(() => {
    if (collectionId) {
      updateSelection(
        historicCollections
          .find(collection => collection.id === collectionId)
          ?.historicEvents || []
      )
      dispatch({ type: "SELECT_COLLECTION", payload: {collectionId: collectionId}});
    }
  }, []);
  
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const getStepNumber = (index: number) => {
    return state.sortOrder === 'ASC' ? (index + 1) : (state.events.length - index);
  }
  
  const isHighlighted = (eventDto: EventDto) => {
    const eventLocationIds = eventDto.locations.map(location => location.locationId);
    return eventLocationIds.every(locationId => state.highlightedLocations.includes(locationId));
  }
  
  const toggleHighlight = (eventDto: EventDto) => {
    isHighlighted(eventDto)
      ? dispatch({type: 'CLEAR_HIGHLIGHTS'})
      : dispatch({type: 'HIGHLIGHT_LOCATIONS', payload: {eventId: eventDto.eventId, all: true}});
  }
  
  const getSortButton = () => {
    return (
      <Button variant="ghost" onClick={() => dispatch({type: 'TOGGLE_SORT_ORDER'})}>
        {state.sortOrder === 'ASC' ? 'Chronological' : 'Most Recent'}
        {state.sortOrder === 'ASC' ? <TbChevronDown /> :  <TbChevronUp />}
      </Button>
    )
  }
  
  if (!collectionId) {
    return;
  }
  
  return (
    <Box>
      <Flex className="collections-navigation-bar" alignItems="center" justifyContent="space-between">
        <Link to={`/collections${location.search}`} replace className="back-link" onClick={() => dispatch({type: 'CLEAR_COLLECTION'})}>
          <TbChevronLeft size={20}/>
          Collections
        </Link>
        <ChakraLink onClick={scrollToSection}>
          Timeline
          <TbChevronDown size={20} />
        </ChakraLink>
      </Flex>
      <Box className="navigation-bar-spacing"></Box>
      {!loading && details && (
        <>
          <img className="header-image" src={details?.thumbnail?.source} alt={`Image of ${details?.title}`}/>
          <Stack className="container">
            <Heading>{details?.title}</Heading>
            <Text textStyle="sm">{details?.extract}</Text>
          </Stack>
        </>
      )}
      {loading && (
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
      <Box ref={sectionRef} className="navigation-bar-spacing"></Box>
      <Tabs.Root defaultValue="timeline" variant="outline" fitted>
        <Tabs.List>
          <Tabs.Trigger value="timeline">
            <TbGitCommit size={18}/>
            Timeline
          </Tabs.Trigger>
          <Tabs.Trigger value="list">
            <TbCarouselVertical size={18}/>
            List
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="timeline" className="container">
          <Flex className="timeline-controls" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap={2}>
              <HoverCard.Root size="sm">
                <HoverCard.Trigger asChild>
                  <TbInfoCircle size={22}/>
                </HoverCard.Trigger>
                <Portal>
                  <HoverCard.Positioner>
                    <HoverCard.Content>
                      <HoverCard.Arrow />
                      <Stack gap="2">
                        <Heading fontSize="sm">How to Use</Heading>
                        <Text fontSize="xs">
                          Click an event to highlight or unhighlight it on the map.
                        </Text>
                      </Stack>
                    </HoverCard.Content>
                  </HoverCard.Positioner>
                </Portal>
              </HoverCard.Root>
              <Heading fontSize="md">Timeline</Heading>
            </Flex>
            {getSortButton()}
          </Flex>
          <Timeline.Root>
            {state.events.map((eventData, index) => (
              <TimelineItem key={eventData.eventId} event={eventData} stepNumber={getStepNumber(index)} isHighlighted={isHighlighted(eventData)} toggleHighlight={toggleHighlight}/>
            ))}
          </Timeline.Root>
        </Tabs.Content>
        <Tabs.Content value="list" className="container">
          <Flex className="timeline-controls" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap={2}>
              <HoverCard.Root size="sm">
                <HoverCard.Trigger asChild>
                  <TbInfoCircle size={22}/>
                </HoverCard.Trigger>
                <Portal>
                  <HoverCard.Positioner>
                    <HoverCard.Content>
                      <HoverCard.Arrow />
                      <Stack gap="2">
                        <Heading fontSize="sm">How to Use</Heading>
                        <Text fontSize="xs">
                          Click on an event to get to its list of locations.
                        </Text>
                      </Stack>
                    </HoverCard.Content>
                  </HoverCard.Positioner>
                </Portal>
              </HoverCard.Root>
              <Heading fontSize="md">Event List</Heading>
            </Flex>
            {getSortButton()}
          </Flex>
          <Flex flexDirection="column" gap={3}>
          {state.events.map((eventData, index) => (
            <EventCard key={eventData.eventId} event={eventData} stepNumber={getStepNumber(index)} isHighlighted={isHighlighted(eventData)} toggleHighlight={toggleHighlight} />
          ))}
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
