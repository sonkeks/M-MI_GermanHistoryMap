import { useEffect, useState } from "react";
import {historicCollections, historicEvents} from "@/components/data.ts";
import type {HistoricCollection, HistoricEvent} from "@/components/types.ts";

type WikiDetails = {
  extract: string;
  thumbnail?: { source: string };
  title: string;
  content_urls: {
    desktop: { page: string };
    mobile?: { page: string };
  };
};

export function useGetWikiDetails(id: string, type: 'EVENT' | 'COLLECTION') {
  const [details, setDetails] = useState<WikiDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let item: HistoricEvent | HistoricCollection | undefined = undefined;
    switch(type) {
      case "EVENT": {
        item = historicEvents.find((item) => item.id === id);
        break;
      }
      case "COLLECTION": {
        item = historicCollections.find((item) => item.id === id);
        break;
      }
      
      default: return;
    }
    
    if (!item) {
      setDetails(null);
      setLoading(false);
      return;
    }
    
    const fetchSummary = async () => {
      try {
        setLoading(true);
        if (item.wikiTitle) {
          const encodedTitle = encodeURIComponent(item.wikiTitle);
          const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`
          );
          if (!res.ok) throw new Error("Failed to fetch Wikipedia summary");
          const data = await res.json();
          setDetails(data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSummary();
  }, [id]);
  
  return { details, loading, error };
}
