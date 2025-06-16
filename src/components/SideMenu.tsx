import {type FunctionComponent, useContext, useState} from "react";
import {Box, Card, Flex, For, Group, IconButton, Input, Stack} from "@chakra-ui/react";
import "./SideMenu.css";
import {EventContext} from "@/components/EventContext.tsx";
import {historicEvents} from "@/components/data.ts";
import {TbMenu2, TbSearch} from "react-icons/tb";

export const SideMenu: FunctionComponent = () => {
  const { state, dispatch } = useContext(EventContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  
  const handleSelect = (eventId: string) => {
    dispatch({ type: "SELECT_EVENT", payload: {eventId: eventId}})
  }
  
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <>
      <Box className={`side-menu ${isOpen ? "" : "closed"}`}>
        <Group className="search-bar" attached w="full">
          <Input size="lg" flex="1" placeholder="Search for an Event" onChange={(e) => setSearchValue(e.currentTarget.value)} />
          <IconButton size="lg" bg="bg.subtle" variant="outline">
            <TbSearch />
          </IconButton>
        </Group>
        {searchValue === "" && (
          <Stack gap="3" direction="column" className="side-menu-content">
            <For each={historicEvents}>
            {(historicEvent =>
              <Card.Root key={historicEvent.id} variant={state.selectedEvent?.id === historicEvent.id ? "elevated" : "outline"} onClick={() => handleSelect(historicEvent.id)}>
                <Card.Header>{historicEvent.label}</Card.Header>
                <Card.Body>Some Description</Card.Body>
                <Card.Footer></Card.Footer>
              </Card.Root>
            )}
            </For>
          </Stack>
        )}
      </Box>
      <Flex gap="4" direction="column" alignItems="center" className="side-menu-container" justifyContent="space-between">
        <IconButton colorPalette="gray" variant="outline" size="lg" onClick={toggleMenu}>
          <TbMenu2 />
        </IconButton>
      </Flex>
    </>
  )
}
