import {type FunctionComponent, useContext} from "react";
import {MapContext} from "@/components/MapContext.tsx";
import type {EventDto} from "@/components/types.ts";
import {Button, Card, Image, Text} from "@chakra-ui/react";
import {getSeededColor} from "@/utility/colorHelper.ts";
import {TbMapPin} from "react-icons/tb";
import {useLocation, useNavigate} from "react-router-dom";

interface EventCardProps {
  event: EventDto,
  stepNumber: number,
  isHighlighted: boolean,
  toggleHighlight: (eventDto: EventDto) => void,
}

export const EventCard: FunctionComponent<EventCardProps> = ({event, stepNumber, isHighlighted, toggleHighlight}) => {
  const {state} = useContext(MapContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <Card.Root id={event.eventId + "-card"} overflow="hidden">
      {event.eventImage && <Image
          objectFit="cover"
          maxH="200px"
          src={event.eventImage + '?width=500'}
          alt={`Image of ${event.eventLabel}`}
      />}
      <Card.Body pb={4}>
        <Card.Title>
          {event.eventLabel}
        </Card.Title>
        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={4}>
          {event.displayDate}
        </Text>
        <Card.Description>
          {event.eventDescription}
        </Card.Description>
        <Text mt={2} fontSize="sm" color="gray.500">
          {`${event.locations.length} Location${event.locations.length > 1 ? 's' : ''}`}
        </Text>
      </Card.Body>
      <Card.Footer justifyContent="space-between">
        <Button variant="outline" onClick={() => navigate(`collectionEvents/${event.eventId}${location.search}`)}>
          Details
        </Button>
        <Button
          variant="ghost"
          style={isHighlighted ? { color: getSeededColor(stepNumber, state.events.length)} : {}}
          onClick={() => toggleHighlight(event)}>
          <TbMapPin />Highlight
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
