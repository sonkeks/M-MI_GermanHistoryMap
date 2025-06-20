import {type FunctionComponent, useContext} from "react";
import {MapContext} from "@/components/MapContext.tsx";
import type {EventDto} from "@/components/types.ts";
import {Button, Card, Image, Text} from "@chakra-ui/react";
import {getSeededColor} from "@/utility/colorHelper.ts";
import {TbMapPin} from "react-icons/tb";

interface EventCardProps {
  event: EventDto,
  stepNumber: number,
  isHighlighted: boolean,
  toggleHighlight: (eventDto: EventDto) => void,
}

export const EventCard: FunctionComponent<EventCardProps> = ({event, stepNumber, isHighlighted, toggleHighlight}) => {
  const {state} = useContext(MapContext);
  
  return (
    <Card.Root id={event.eventId + "-card"} overflow="hidden">
      {event.eventImage && <Image
          objectFit="cover"
          maxH="200px"
          src={event.eventImage + '?width=500'}
          alt={`Image of ${event.eventLabel}`}
      />}
      <Card.Body>
        <Card.Title>
          {event.eventLabel}
        </Card.Title>
        <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={4}>
          {event.displayDate}
        </Text>
        <Card.Description>
          {event.eventDescription}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="space-between">
        <Text fontSize="sm" color="gray.500">
          {`${event.locations.length} Location${event.locations.length > 1 ? 's' : ''}`}
        </Text>
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
