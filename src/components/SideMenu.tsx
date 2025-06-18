import {type FunctionComponent, useContext, useEffect, useState} from "react";
import {Box, Flex, IconButton, Image} from "@chakra-ui/react";
import "./SideMenu.css";
import {TbMenu2} from "react-icons/tb";
import { Content } from "./Content/Content";
import {Outlet} from "react-router-dom";
import {MapContext} from "@/components/MapContext.tsx";
import {MAP_STYLES} from "@/components/types.ts";

export const SideMenu: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { dispatch } = useContext(MapContext);
  
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
        <Flex gap={3} direction="column">
          {Object.entries(MAP_STYLES).map(([key, style]) => (
            <Box className="map-image-container" key={key}>
              <Image className="map-style-image" src={style.image} onClick={() => dispatch({type: "SELECT_MAPSTYLE", payload: {key: key}})} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </>
  )
}
