export type EventLocation = {
  event: {
    type: "uri";
    value: string;
  };
  eventId: {
    type: string,
    value: string,
  };
  startDate: {
    datatype: string;
    type: "literal";
    value: string;
  };
  endDate: {
    datatype: string;
    type: "literal";
    value: string;
  };
  coordinate: {
    datatype: string;
    type: "literal";
    value: "string";
  };
  image: {
    type: string,
    value: string
  }
  eventLabel: {
    "xml:lang": string;
    type: "literal";
    value: string;
  };
  eventDescription: {
    "xml:lang": string;
    type: "literal";
    value: string;
  };
  eventImage: {
    type: string,
    value: string
  }
  locationLabel: {
    "xml:lang": string;
    type: "literal";
    value: string;
  };
}

export type RestructuredEvent = {
  eventId: string;
  eventLabel: string;
  eventDescription: string;
  eventImage?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  locations: {
    locationLabel?: string;
    coordinate?: string;
    image?: string;
  }[];
};

export function groupEventLocations(data: EventLocation[]): RestructuredEvent[] {
  const grouped: Record<string, RestructuredEvent> = {};
  
  for (const item of data) {
    const id = item.eventId.value;
    try {
      if (!grouped[id]) {
        grouped[id] = {
          eventId: id,
          eventLabel: item.eventLabel.value,
          eventDescription: item.eventDescription.value,
          eventImage: item.eventImage && item.eventImage.type === "uri" ? item.eventImage.value : undefined,
          startDate: item.startDate ? item.startDate.value : undefined,
          endDate: item.endDate ? item.endDate.value : undefined,
          image: item.image && item.image.type === "uri" ? item.image.value : undefined,
          locations: [],
        };
      }
      
      // Only add location if coordinate or locationLabel exists
      if (item.coordinate?.value || item.locationLabel?.value) {
        grouped[id].locations.push({
          locationLabel: item.locationLabel?.value,
          coordinate: item.coordinate?.value,
          image: item.image?.value,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  return Object.values(grouped);
}

export type HistoricEvent = {
  label: string;
  id: string;
  year: string;
  wikiTitle?: string;
}

export type HistoricCollection = {
  id: string,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  historicEvents: HistoricEvent['id'][],
  wikiTitle: string,
}

export type Category = 'EVENTS' | 'COLLECTIONS' | 'ALL';
