import { useEffect, useState } from "react";
import { historicEvents } from "@/components/data.ts";

type EventDetails = {
  extract: string;
  thumbnail?: { source: string };
  title: string;
  content_urls: {
    desktop: { page: string };
    mobile?: { page: string };
  };
};

export function useGetEventDetails(eventId: string) {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const event = historicEvents.find((item) => item.id === eventId);
    if (!event) {
      setEventDetails(null);
      setLoading(false);
      return;
    }
    
    const fetchSummary = async () => {
      try {
        setLoading(true);
        if (event.wikiTitle) {
          const encodedTitle = encodeURIComponent(event.wikiTitle);
          const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`
          );
          if (!res.ok) throw new Error("Failed to fetch Wikipedia summary");
          const data = await res.json();
          setEventDetails(data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSummary();
  }, [eventId]);
  
  return { eventDetails, loading, error };
}
