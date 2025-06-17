import {type FunctionComponent, useState} from "react";
import {Box, Flex, IconButton} from "@chakra-ui/react";
import "./SideMenu.css";
import {TbMenu2} from "react-icons/tb";
import { Content } from "./Content/Content";
import {Outlet} from "react-router-dom";

export const SideMenu: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <>
      <Box className={`side-menu ${isOpen ? "" : "closed"}`}>
        <Content>
          <Outlet />
        </Content>
        {/*
        <Group className="search-bar" attached w="full">
          <Input size="lg" flex="1" placeholder="Search for an Event" value={searchValue} onChange={(e) => setSearchValue(e.currentTarget.value)} />
          <IconButton size="lg" bg="bg.subtle" variant="outline">
            <TbSearch />
          </IconButton>
        </Group>
        */}
      </Box>
      <Flex gap="4" direction="column" alignItems="center" className="side-menu-container" justifyContent="space-between">
        <IconButton colorPalette="gray" variant="outline" size="lg" onClick={toggleMenu}>
          <TbMenu2 />
        </IconButton>
      </Flex>
    </>
  )
}
