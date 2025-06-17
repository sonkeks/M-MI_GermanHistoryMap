import type {HistoricEvent, HistoricCollection} from "@/components/types.ts";

export const historicCollections: HistoricCollection[] = [
  {
    id: "wwi",
    title: "World War I",
    description: "Description",
    startDate: new Date(),
    endDate: new Date(),
    historicEvents: [],
    wikiTitle: "World_War_I"
  },
  {
    id: "wwii",
    title: "World War II",
    description: "Description",
    startDate: new Date(),
    endDate: new Date(),
    historicEvents: ["wd:Q3927614", "wd:Q36756", "wd:Q150812", "wd:Q152120", "wd:Q38789", "wd:Q152142"],
    wikiTitle: "World_War_II"
  },
  {
    id: "cold-war",
    title: "Cold War",
    description: "Description",
    startDate: new Date(),
    endDate: new Date(),
    historicEvents: [],
    wikiTitle: "Cold_War"
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
    label: "Treaty of Versailles",
    id: "wd:Q8736",
    year: "1919",
    wikiTitle: "Treaty_of_Versailles"
  },
  {
    label: "Kristallnacht",
    id: "wd:Q36756",
    year: "1938",
    wikiTitle: "Kristallnacht"
  },
  {
    label: "Invasion of Poland",
    id: "wd:Q150812",
    year: "1939",
    wikiTitle: "Invasion_of_Poland"
  },
  {
    label: "Battle of Stalingrad",
    id: "wd:Q38789",
    year: "1942",
    wikiTitle: "Battle_of_Stalingrad"
  },
  {
    label: "Bombing of Dresden",
    id: "wd:Q152142",
    year: "1945",
    wikiTitle: "Bombing_of_Dresden"
  },
  {
    label: "Wannsee Conference",
    id: "wd:Q152120",
    year: "1942",
    wikiTitle: "Wannsee_Conference"
  }
]

