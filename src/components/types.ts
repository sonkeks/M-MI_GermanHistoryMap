export type HistoricEvent = {
  label: string;
  id: string;
  year: string;
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
