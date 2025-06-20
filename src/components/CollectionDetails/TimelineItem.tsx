import {useContext, type FunctionComponent} from "react";
import type {EventDto} from "@/components/types.ts";
import {Box, Flex, Text, Timeline} from "@chakra-ui/react";
import {getSeededColor} from "@/utility/colorHelper.ts";
import {MapContext} from "@/components/MapContext.tsx";

interface TimelineItemInterface {
  event: EventDto,
  stepNumber: number,
  isHighlighted: boolean,
  toggleHighlight: (eventDto: EventDto) => void,
}

export const TimelineItem: FunctionComponent<TimelineItemInterface> = ({event, stepNumber, isHighlighted, toggleHighlight}) => {
  const {state} = useContext(MapContext);
  
  const getIndicatorStyle = () => {
    let baseStyle = {
      cursor: 'pointer',
      backgroundColor: getSeededColor(stepNumber, state.events.length),
      border: 'inherit',
      color: 'white',
      transition: 'background-color 0.3s'
    }
    if (state.highlightedLocations.length !== 0) {
      if (isHighlighted) {
        return baseStyle;
      } else {
        baseStyle.backgroundColor = 'silver';
        return baseStyle;
      }
    }
    return baseStyle;
  }
  
  return (
    <Timeline.Item id={event.eventId + "-timeline"}>
      <Timeline.Connector>
        <Timeline.Separator />
        <Timeline.Indicator
          onClick={() => toggleHighlight(event)}
          style={getIndicatorStyle()}
        >
          {stepNumber}
        </Timeline.Indicator>
      </Timeline.Connector>
      <Timeline.Content onClick={() => toggleHighlight(event)} style={{cursor: 'pointer'}}>
        <Flex justifyContent="space-between">
          <Box>
            <Timeline.Title>{event.eventLabel}</Timeline.Title>
            <Timeline.Description>{event.displayDate}</Timeline.Description>
          </Box>
        </Flex>
        <Text textStyle="sm">
          {event.eventDescription}
        </Text>
      </Timeline.Content>
    </Timeline.Item>
  )
}
