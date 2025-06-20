import {type FunctionComponent, useContext, useEffect, useState} from "react";
import {Box, Flex, IconButton, Image, Text, Portal, Link, Heading, Dialog, CloseButton, Stack} from "@chakra-ui/react";
import "./SideMenu.css";
import {TbExternalLink, TbInfoSmall, TbMenu2} from "react-icons/tb";
import { Content } from "../Content/Content.tsx";
import {Outlet} from "react-router-dom";
import {MapContext} from "@/components/MapContext.tsx";
import {MAP_STYLES} from "@/components/types.ts";

export const SideMenu: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(MapContext);
  
  useEffect(() => {
    setTimeout(() => setIsOpen(true), 300);
  }, []);
  
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <>
      <Box className={`side-menu ${isOpen ? "" : "closed"}`}>
        <Content>
          <Outlet />
        </Content>
      </Box>
      <Flex gap="4" direction="column" alignItems="center" className="side-menu-container" justifyContent="space-between">
        <IconButton colorPalette="gray" variant="outline" size="lg" onClick={toggleMenu}>
          <TbMenu2 />
        </IconButton>
        <Flex gap={3} direction="column" className="inner-flex-container">
          {Object.entries(MAP_STYLES).map(([key, style]) => (
            <Box className="map-image-container" key={key}>
              <Image className={["map-style-image", state.mapStyle === key ? "map-selected" : ""].join(" ")} src={style.image} onClick={() => dispatch({type: "SELECT_MAPSTYLE", payload: {key: key}})} />
            </Box>
          ))}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <IconButton colorPalette="gray" variant="outline" size="lg">
                <TbInfoSmall />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title fontSize="xl">Impressum</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Heading fontSize="md">Haftungsausschluss</Heading>
                    <Text fontSize="xs" mb="1">
                      Diese App zeigt historische Daten an, die von <Link variant="underline" href="https://en.wikipedia.org/wiki/Main_Page" target="_blank">Wikipedia<TbExternalLink/></Link> und <Link variant="underline" href="https://www.wikidata.org/wiki/Wikidata:Main_Page" target="_blank">Wikidata<TbExternalLink/></Link> bezogen werden. Die Inhalte sind öffentlich zugänglich und werden von der Community gepflegt.
                      Es wird keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der dargestellten Daten übernommen.
                    </Text>
                    
                    <Heading mt="20px" fontSize="md">Dienste Dritter</Heading>
                    <Text fontSize="xs" mb="1">
                      Kartendaten und -stile können auf externe Anbieter (OpenStreetMap, Esri, Leaflet) zurückgreifen. Diese Dienste können Nutzungsdaten gemäß ihren eigenen Datenschutzrichtlinien verarbeiten.
                    </Text>
                    
                    <Heading mt="20px" fontSize="md">Datenschutzerklärung</Heading>
                    <Text fontSize="xs" mb="1">
                      Diese App erhebt oder speichert <strong>keine</strong> personenbezogenen Daten. Es werden keine Nutzerprofile erstellt und keine Tracking-Tools verwendet.
                      Sollte sich dies in zukünftigen Versionen ändern, wird die Datenschutzerklärung entsprechend aktualisiert.
                    </Text>
                    
                    <Heading mt="20px" fontSize="md">Haftung für Inhalte</Heading>
                    <Text fontSize="xs" mb="1">
                      Gemäß §§ 8 bis 10 TMG bin ich als Diensteanbieter nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                      Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                    </Text>
                    
                    <Heading mt="20px" fontSize="md">Angaben gemäß § 5 TMG</Heading>
                    <Stack my="1">
                      <Text fontSize="xs">Sönke Schaarschmidt</Text>
                      <Text fontSize="xs">Stockholmer Straße 1.</Text>
                      <Text fontSize="xs">13359, Berlin</Text>
                      <Text fontSize="xs">Germany</Text>
                      <Text fontSize="xs">Email: soenke.schaarschmidt@gmail.com</Text>
                    </Stack>
                  </Dialog.Body>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Flex>
      </Flex>
    </>
  )
}
