import {type FunctionComponent, useEffect, useState} from "react";
import {Box, Flex, IconButton} from "@chakra-ui/react";
import "./SideMenu.css";
import {TbMenu2} from "react-icons/tb";
import { Content } from "./Content/Content";
import {Outlet} from "react-router-dom";

export const SideMenu: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
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
      </Flex>
    </>
  )
}
