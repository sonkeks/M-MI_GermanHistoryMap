import {type FunctionComponent, useContext} from "react";
import {Box, Button, Flex, Menu, Portal, Slider} from "@chakra-ui/react";
import "./Header.css";
import {EventContext} from "@/components/EventContext.tsx";
import {historicEvents} from "@/components/data.ts";

export const Header: FunctionComponent = () => {
  const marks = [
    { value: 0, label: "1800" },
    { value: 10, label: "" },
    { value: 20, label: "" },
    { value: 30, label: "" },
    { value: 40, label: "" },
    { value: 50, label: "" },
    { value: 60, label: "" },
    { value: 70, label: "" },
    { value: 80, label: "" },
    { value: 90, label: "" },
    { value: 100, label: "2020" },
  ];
  
  const { state, dispatch } = useContext(EventContext);
  
  const handleSelect = (eventId: string) => {
    dispatch({ type: "SELECT_EVENT", payload: {eventId: eventId}})
  }
  
  return (
    <Flex className="layout top-controls">
      <Menu.Root
        closeOnSelect
        highlightedValue={state.selectedEvent?.id}
      >
        <Menu.Trigger asChild>
          <Button size="md">
            Select Event
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {historicEvents.map(
                historicEvent => (
                  <Menu.Item
                    onClick={() => handleSelect(historicEvent.id)}
                    key={historicEvent.id}
                    value={historicEvent.id}
                  >
                    {historicEvent.label}
                  </Menu.Item>
                )
              )}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <Box className="slider-box" bg="white">
        <Slider.Root size={"lg"} width="600px" step={10}>
          <Slider.Label>Period</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
            <Slider.Marks marks={marks}/>
          </Slider.Control>
        </Slider.Root>
      </Box>
    </Flex>
  )
}
