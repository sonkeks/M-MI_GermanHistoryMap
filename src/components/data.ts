import type {HistoricEvent, HistoricCollection} from "@/components/types.ts";

export const collections: HistoricCollection[] = [
  {
    id: "wwi",
    title: "World War I",
    description: "Description",
    startDate: new Date(),
    endDate: new Date(),
    historicEvents: ["wd:Q3927614", "wd:Q36756", "wd:Q150812", "wd:Q152120", "wd:Q38789", "wd:Q36749", "wd:Q152142"]
  },
  {
    id: "wwii",
    title: "World War II",
    description: "Description",
    startDate: new Date(),
    endDate: new Date(),
    historicEvents: []
  },
  {
    id: "cold-war",
    title: "Cold War",
    description: "Description",
    startDate: new Date(),
    endDate: new Date(),
    historicEvents: []
  }
]

export const historicEvents: HistoricEvent[] = [
  {
    label: "Book Burning",
    id: "wd:Q3927614",
    year: "1933",
    wikiTitle: "Nazi_book_burnings"
  },
  {
    label: "Battle of Leipzig",
    id: "wd:Q151005",
    year: "1813",
    wikiTitle: "Battle_of_Leipzig"
  },
  {
    label: "Fall of the Berlin Wall",
    id: "wd:Q69163529",
    year: "1990",
    wikiTitle: "Fall_of_the_Berlin_Wall"
  },
  {
    label: "German Revolution of 1918–1919",
    id: "wd:Q170306",
    year: "1918–1919",
    wikiTitle: ""
  },
  {
    label: "Treaty of Versailles",
    id: "wd:Q8736",
    year: "1919",
    wikiTitle: "Treaty_of_Versailles"
  },
  {
    label: "World War I",
    id: "wd:Q361",
    year: "1914",
    wikiTitle: ""
  }
]

