import type {HistoricEvent, HistoricCollection} from "@/components/types.ts";

export const collections: HistoricCollection[] = [
  {
    id: "wwi",
    title: "World War I",
    description: "Description",
    startDate: new Date(),
    endDate: new Date(),
    historicEvents: ["wd:Q3927614", "wd:Q36756", "wd:Q150812", "wd:Q152120", "wd:Q38789", "wd:Q36749", "wd:Q152142"]
  }
]

export const historicEvents: HistoricEvent[] = [
  {
    label: "Book Burning",
    id: "wd:Q3927614",
    year: "1933"
  },
  {
    label: "Battle of Leipzig",
    id: "wd:Q151005",
    year: "1813"
  },
  {
    label: "Fall of the Berlin Wall",
    id: "wd:Q69163529",
    year: "1990"
  },
  {
    label: "German Revolution of 1918–1919",
    id: "wd:Q170306",
    year: "1918–1919"
  },
  {
    label: "Treaty of Versailles",
    id: "wd:Q8736",
    year: "1919"
  },
  {
    label: "World War I",
    id: "wd:Q361",
    year: "1914"
  }
]

