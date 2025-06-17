export type EventLocation = {
  event: {
    type: "uri";
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
  locationLabel: {
    "xml:lang": string;
    type: "literal";
    value: string;
  };
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
  historicEvents: HistoricEvent['id'][]
}

export type Category = 'EVENTS' | 'COLLECTIONS' | 'ALL';
