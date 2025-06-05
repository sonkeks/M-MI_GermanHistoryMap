export type HistoricEvent = {
  label: string;
  id: string;
  year: string;
}

export type HistoricEventCollection = {
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  historicEvents: HistoricEvent['id'][]
}
