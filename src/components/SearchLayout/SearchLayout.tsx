import {type FunctionComponent, useState} from "react";
import {Box, Group, IconButton, Input} from "@chakra-ui/react";
import {TbSearch} from "react-icons/tb";
import {Outlet} from "react-router-dom";
import "./SearchLayout.css";

// type Category = 'EVENTS' | 'COLLECTIONS' | 'ALL';

export const SearchLayout: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  // const [category, setCategory] = useState<Category>('ALL');
  
  return (
    <Box>
      <Group className="search-bar" attached w="full">
        <Input size="lg" flex="1" placeholder="Search for an Event" value={searchValue} onChange={(e) => setSearchValue(e.currentTarget.value)} />
        <IconButton size="lg" bg="bg.subtle" variant="outline">
          <TbSearch />
        </IconButton>
      </Group>
      <Outlet />
    </Box>
  )
}
