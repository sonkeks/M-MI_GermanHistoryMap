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
  Image,
  Portal,
  Card, Skeleton
} from "@chakra-ui/react";
import {type FunctionComponent, useContext, useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {TbChevronDown, TbChevronLeft, TbChevronUp, TbGitCommit, TbInfoCircle, TbList} from "react-icons/tb";
import {MapContext} from "@/components/MapContext.tsx";
import {historicCollections} from "@/components/data.ts";
import {useGetWikiDetails} from "@/hooks/useGetWikiDetails.ts";
import "./CollectionDetails.css";
import {getDateFormat, getSortableDate} from "@/utility/dateHelper.ts";

export const CollectionDetails: FunctionComponent = () => {
  const { collectionId } = useParams();
  const { dispatch, eventRecords } = useContext(MapContext);
  const {details, loading} = useGetWikiDetails(collectionId!, 'COLLECTION');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  
  const historicCollection = historicCollections.find(item => item.id === collectionId);
  
  useEffect(() => {
    if (collectionId) {
      dispatch({ type: "SELECT_COLLECTION", payload: {collectionId: collectionId}});
    }
  }, []);
  
  const sortedEvents = () => {
    return [...eventRecords].sort((a, b) => {
      const dateA = getSortableDate(a.startDate, a.endDate);
      const dateB = getSortableDate(b.startDate, b.endDate);
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      const diff = dateA.getTime() - dateB.getTime();
      return sortOrder === 'ASC' ? diff : -diff;
    });
  }
  
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  if (!historicCollection) {
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
          Go to Events
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
            <TbList size={18}/>
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
                          Hover over an event to highlight its markers on the map.
                          Clicking on an event shows you all it's locations.
                        </Text>
                      </Stack>
                    </HoverCard.Content>
                  </HoverCard.Positioner>
                </Portal>
              </HoverCard.Root>
              <Heading fontSize="md">Timeline</Heading>
            </Flex>
            <Button variant="ghost" onClick={() => setSortOrder((prevState) => prevState === 'ASC' ? 'DESC' : 'ASC')}>
              {sortOrder === 'ASC' ? 'Chronological' : 'Most Recent'}
              {sortOrder === 'ASC' ? <TbChevronDown /> :  <TbChevronUp />}
            </Button>
          </Flex>
          <Timeline.Root>
            {sortedEvents().map((structuredEvent, index) => (
              <Timeline.Item key={structuredEvent.eventId}>
                <Timeline.Connector>
                  <Timeline.Separator />
                  <Timeline.Indicator>
                    {sortOrder === 'ASC' ? (index + 1) : (eventRecords.length - index)}
                  </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                  <Timeline.Title>{structuredEvent.eventLabel}</Timeline.Title>
                  <Timeline.Description>{getDateFormat(structuredEvent.startDate, structuredEvent.endDate)}</Timeline.Description>
                  <Text textStyle="sm">
                    {structuredEvent.eventDescription}
                  </Text>
                </Timeline.Content>
              </Timeline.Item>
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
            <Button variant="ghost" onClick={() => setSortOrder((prevState) => prevState === 'ASC' ? 'DESC' : 'ASC')}>
              {sortOrder === 'ASC' ? 'Chronological' : 'Most Recent'}
              {sortOrder === 'ASC' ? <TbChevronDown /> :  <TbChevronUp />}
            </Button>
          </Flex>
          <Flex flexDirection="column" gap={3}>
          {sortedEvents().map(structuredEvent => (
            <Card.Root key={structuredEvent.eventId} overflow="hidden">
              <Image
                objectFit="cover"
                maxH="200px"
                src={structuredEvent.eventImage + '?width=500'}
                alt="Caffe Latte"
              />
              <Card.Body gap="2">
                <Card.Title mt="2">{structuredEvent.eventLabel}</Card.Title>
                <Card.Description>
                  {structuredEvent.eventDescription}
                </Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="end">
                <Button variant="outline">
                  Show on Map
                </Button>
              </Card.Footer>
            </Card.Root>
          ))}
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
