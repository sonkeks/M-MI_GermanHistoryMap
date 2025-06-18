import {useContext, useEffect, useRef, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContext } from '@/components/MapContext';

const DEBOUNCE_IN_MS = 500;

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const { dispatch } = useContext(MapContext);
  
  useEffect(() => {
    const updatedSearchValue = searchParams.get('q') || '';
    if (updatedSearchValue !== searchValue) {
      setSearchValue(updatedSearchValue);
      dispatch({ type: 'SET_SEARCH_QUERY', payload: updatedSearchValue });
    }
  }, [searchParams]);
  
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
  };
}
