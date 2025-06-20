import {useContext, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import { MapContext } from '@/components/MapContext';

const DEBOUNCE_IN_MS = 500;

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const { dispatch } = useContext(MapContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const updatedSearchValue = searchParams.get('q') || '';
    if (updatedSearchValue !== searchValue) {
      setSearchValue(updatedSearchValue);
      dispatch({ type: 'SET_SEARCH_QUERY', payload: updatedSearchValue });
    }
  }, [searchParams]);
  
  const buildPath = (destination: string) => {
    return `/${destination}?q=${encodeURIComponent(searchValue)}`;
  }
  
  const onFocus = () => {
    if (location.pathname.includes('collections')) {
      dispatch({type: "CLEAR_COLLECTION"});
      navigate(buildPath("collections"));
    } else if (location.pathname.includes('events')) {
      dispatch({type: "CLEAR_EVENT"});
      navigate(buildPath("events"));
    } else {
      navigate(buildPath("collections"));
    }
  }
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const debouncedSetSearch = (input: string) => {
    setSearchValue(input);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      if (input) {
        setSearchParams({ q: input });
      } else {
        setSearchParams({});
      }
    }, DEBOUNCE_IN_MS);
  };
  
  return {
    searchValue,
    setSearchValue: debouncedSetSearch,
    onFocus,
  };
}
