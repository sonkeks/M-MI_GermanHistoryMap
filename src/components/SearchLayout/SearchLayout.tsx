import {type FunctionComponent, useContext, useEffect, useState} from "react";
import {Box, Flex, Input, InputGroup, Tabs} from "@chakra-ui/react";
import {TbBooks, TbCalendarMonth, TbSearch} from "react-icons/tb";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import "./SearchLayout.css";
import {MapContext} from "@/components/MapContext.tsx";
import {useSearch} from "@/hooks/useSearch.ts";
import type {Category} from "@/components/types.ts";
import {buildUrlForCategory} from "@/utility/routingHelpers.ts";

export const SearchLayout: FunctionComponent = () => {
  const {state} = useContext(MapContext);
  const {searchValue, setSearchValue, onFocus} = useSearch();
  const [category, setCategory] = useState<Category>('COLLECTIONS');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes('/events')) {
      setCategory('EVENTS')
    } else if (pathname.includes('/collections')) {
      setCategory('COLLECTIONS')
    } else {
      setCategory('COLLECTIONS')
    }
  }, [location]);
  
  const handleCategorySelect = (e: any) => {
    setCategory(e.value);
    let search = location.search;
    
    if (!search || !new URLSearchParams(search).get('q')) {
      const query = state.currentSearchQuery;
      if (query) {
        search = `?q=${encodeURIComponent(query)}`;
      }
    }
    
    const basePath = buildUrlForCategory(e.value, state);
    navigate(`${basePath}${search}`);
  }
  
  const getPlaceholder = () => {
    switch (category) {
      case "EVENTS":
        return "Search for an Event"
      case "COLLECTIONS":
        return "Search for a Collection"
    }
  }
  
  return (
    <Flex direction="column" height="100vh">
      <InputGroup startElement={<TbSearch size={16} />} w="full" className="search-bar">
        <Input
          flex="1"
          size="lg"
          placeholder={getPlaceholder()}
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          onFocus={onFocus}
        />
      </InputGroup>
      <Tabs.Root variant="line" value={category} onValueChange={(e) => handleCategorySelect(e)}>
        <Tabs.List>
          <Tabs.Trigger value="COLLECTIONS">
            <TbBooks />
            Collections
          </Tabs.Trigger>
          <Tabs.Trigger value="EVENTS">
            <TbCalendarMonth />
            Events
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      <Box className="scrollable-container">
        <Outlet />
      </Box>
    </Flex>
  )
}
