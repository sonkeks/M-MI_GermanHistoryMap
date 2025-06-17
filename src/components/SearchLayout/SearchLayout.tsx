import {type FunctionComponent, useEffect, useState} from "react";
import {Box, Group, IconButton, Input, Tabs} from "@chakra-ui/react";
import {TbBooks, TbCalendarMonth, TbCategory, TbSearch} from "react-icons/tb";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import "./SearchLayout.css";

type Category = 'EVENTS' | 'COLLECTIONS' | 'ALL';

export const SearchLayout: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<Category>('ALL');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes('/events')) {
      setCategory('EVENTS')
    } else if (pathname.includes('/collections')) {
      setCategory('COLLECTIONS')
    } else {
      setCategory('ALL')
    }
  }, [location]);
  
  const handleCategorySelect = (e: any) => {
    setCategory(e.value);
    switch (e.value as Category) {
      case "ALL": {
        navigate("/");
        break;
      }
      case "COLLECTIONS": {
        navigate("/collections");
        break;
      }
      case "EVENTS": {
        navigate("/events");
        break;
      }
    }
  }
  
  return (
    <Box>
      <Group className="search-bar" attached w="full">
        <Input size="lg" flex="1" placeholder="Search for an Event" value={searchValue} onChange={(e) => setSearchValue(e.currentTarget.value)} />
        <IconButton size="lg" bg="bg.subtle" variant="outline">
          <TbSearch />
        </IconButton>
      </Group>
      <Tabs.Root variant="line" value={category} onValueChange={(e) => handleCategorySelect(e)}>
        <Tabs.List>
          <Tabs.Trigger value="ALL">
            <TbCategory />
            All
          </Tabs.Trigger>
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
      <Outlet />
    </Box>
  )
}
