import {type FunctionComponent, useContext, useEffect, useState} from "react";
import {Box, Flex, IconButton, Image} from "@chakra-ui/react";
import "./SideMenu.css";
import {TbMenu2} from "react-icons/tb";
import { Content } from "../Content/Content.tsx";
import {Outlet} from "react-router-dom";
import {MapContext} from "@/components/MapContext.tsx";
import {MAP_STYLES} from "@/components/types.ts";
import {About} from "@/components/SideMenu/About.tsx";

export const SideMenu: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(MapContext);
  
  useEffect(() => {
    const isMobile = window.innerWidth <= 500;
    if (!isMobile) {
      setTimeout(() => setIsOpen(true), 300);
    }
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
      <Flex gap="4" alignItems="center" className="side-menu-container" justifyContent="space-between">
        <IconButton colorPalette="gray" variant="outline" size="lg" onClick={toggleMenu}>
          <TbMenu2 />
        </IconButton>
        <Flex gap={3} className="inner-flex-container">
          {Object.entries(MAP_STYLES).map(([key, style]) => (
            <Box className="map-image-container" key={key}>
              <Image className={["map-style-image", state.mapStyle === key ? "map-selected" : ""].join(" ")} src={style.image} onClick={() => dispatch({type: "SELECT_MAPSTYLE", payload: {key: key}})} />
            </Box>
          ))}
          <About />
        </Flex>
      </Flex>
    </>
  )
}
