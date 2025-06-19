import type {HistoricEvent, HistoricCollection} from "@/components/types.ts";

export const historicCollections: HistoricCollection[] = [
  {
    id: "wwi",
    title: "World War I",
    startDate: new Date(1914, 6, 28),
    description: "Fought from 1914 to 1918, it involved major world powers and introduced modern warfare. Sparked by political alliances and assassinations, it ended with the fall of empires.",
    historicEvents: [
      "wd:Q192050",
      "wd:Q190712",
      "wd:Q853976",
      "wd:Q164983",
      "wd:Q130847",
      "wd:Q132568",
      "wd:Q3921580",
      "wd:Q8729",
      "wd:Q253224",
      "wd:Q750567",
      "wd:Q153858",
      "wd:Q8736"
    ],
    wikiTitle: "World_War_I"
  },
  {
    id: "wwii",
    title: "World War II",
    startDate: new Date(1939, 8, 1),
    description: "A global war from 1939 to 1945, led by the rise of fascism and Nazi aggression. It reshaped the world order and ended with the defeat of the Axis and the atomic bomb.",
    historicEvents: [
      "wd:Q3927614",
      "wd:Q36756",
      "wd:Q150812",
      "wd:Q152120",
      "wd:Q38789",
      "wd:Q152142",
      "wd:Q173034",
      "wd:Q130861",
      "wd:Q16471",
      "wd:Q162250",
      "wd:Q1402078",
      "wd:Q488"
    ],
    wikiTitle: "World_War_II"
  },
  {
    id: "cold-war",
    title: "Cold War",
    startDate: new Date(1947, 2, 12),
    description: "A global power struggle between the U.S. and USSR after World War II. Marked by nuclear tension, proxy wars, and a race for ideological dominance.",
    historicEvents: [
      "wd:Q151349",
      "wd:Q8663",
      "wd:Q164348",
      "wd:Q748379",
      "wd:Q191721",
      "wd:Q128160",
      "wd:Q162401",
      "wd:Q8740",
      "wd:Q83085",
      "wd:Q69163529"
    ],
    wikiTitle: "Cold_War"
  },
  {
    id: "french-revolution",
    title: "French Revolution",
    startDate: new Date(1789, 4, 5),
    description: "A period of radical political and social upheaval in France beginning in 1789. It ended the monarchy, inspired democratic ideals, and reshaped European history.",
    historicEvents: [
      "wd:Q60022",
      "wd:Q6539",
      "wd:Q1154330",
      "wd:Q193547",
      "wd:Q3062706",
      "wd:Q1089686",
      "wd:Q862586",
    ],
    wikiTitle: "French_Revolution"
  },
  {
    id: "napoleonic-wars",
    title: "Napoleonic Wars",
    startDate: new Date(1803, 4, 18),
    description: "A series of wars led by Napoleon Bonaparte that reshaped Europe through battles across the continent.",
    historicEvents: [
      "wd:Q171416",
      "wd:Q134114",
      "wd:Q154426",
      "wd:Q152499",
      "wd:Q541626",
      "wd:Q184320",
      "wd:Q151005",
      "wd:Q48314",
      "wd:Q690989",
      "wd:Q179250"
    ],
    wikiTitle: "Napoleonic_Wars"
  },
  {
    id: "roman-empire",
    title: "Roman Empire",
    startDate: new Date(-27, 0, 16),
    description: "An ancient empire centered around the Mediterranean, known for its military, engineering, and legal legacy.",
    historicEvents: [
      "wd:Q87779",
      "wd:Q215231",
      "wd:Q3555020",
      "wd:Q2411998",
      "wd:Q1463845",
      "wd:Q339321",
      "wd:Q1025466",
      "wd:Q160387",
      "wd:Q139808",
    ],
    wikiTitle: "Roman_Empire"
  }
]

export const historicEvents: HistoricEvent[] = [
  // Cold War
  { label: "Berlin Blockade", id: "wd:Q151349", year: "1948", wikiTitle: "Berlin_Blockade" },
  { label: "Korean War", id: "wd:Q8663", year: "1950", wikiTitle: "Korean_War" },
  { label: "Hungarian Uprising", id: "wd:Q164348", year: "1956", wikiTitle: "Hungarian_Uprising_of_1956" },
  { label: "U‑2 Incident", id: "wd:Q748379", year: "1960", wikiTitle: "1960_U-2_incident" },
  { label: "Bay of Pigs Invasion", id: "wd:Q191721", year: "1961", wikiTitle: "Bay_of_Pigs_Invasion" },
  { label: "Cuban Missile Crisis", id: "wd:Q128160", year: "1962", wikiTitle: "Cuban_Missile_Crisis" },
  { label: "Prague Spring", id: "wd:Q162401", year: "1968", wikiTitle: "Prague_Spring" },
  { label: "Vietnam War", id: "wd:Q8740", year: "1955", wikiTitle: "Vietnam_War" },
  { label: "Soviet–Afghan War", id: "wd:Q83085", year: "1979", wikiTitle: "Soviet–Afghan_War" },
  { label: "Fall of the Berlin Wall", id: "wd:Q69163529", year: "1990", wikiTitle: "Fall_of_the_Berlin_Wall"},
  // WWII
  { label: "Book Burning", id: "wd:Q3927614", year: "1933", wikiTitle: "Nazi_book_burnings"},
  { label: "Kristallnacht", id: "wd:Q36756", year: "1938", wikiTitle: "Kristallnacht"},
  { label: "Invasion of Poland", id: "wd:Q150812", year: "1939", wikiTitle: "Invasion_of_Poland"},
  { label: "Battle of Stalingrad", id: "wd:Q38789", year: "1942", wikiTitle: "Battle_of_Stalingrad"},
  { label: "Bombing of Dresden", id: "wd:Q152142", year: "1945", wikiTitle: "Bombing_of_Dresden"},
  { label: "Wannsee Conference", id: "wd:Q152120", year: "1942", wikiTitle: "Wannsee_Conference"},
  { label: "Battle of Midway", id: "wd:Q173034", year: "1942", wikiTitle: "Battle_of_Midway"},
  { label: "Battle of Kursk", id: "wd:Q130861", year: "1943", wikiTitle: "Battle_of_Kursk"},
  { label: "Invasion of Normandy (D‑Day)", id: "wd:Q16471", year: "1944", wikiTitle: "Invasion_of_Normandy"},
  { label: "First Battle of El Alamein", id: "wd:Q162250", year: "1942", wikiTitle: "First_Battle_of_El_Alamein"},
  { label: "Warsaw Uprising", id: "wd:Q1402078", year: "1944", wikiTitle: "Warsaw_Uprising"},
  { label: "Atomic bombings of Hiroshima and Nagasaki", id: "wd:Q488", year: "1945", wikiTitle: "Atomic_bombings_of_Hiroshima_and_Nagasaki"},
  // WWI
  { label: "Assassination of Archduke Franz Ferdinand", id: "wd:Q192050", year: "1914", wikiTitle: "Assassination_of_Archduke_Franz_Ferdinand" },
  { label: "First Battle of the Marne", id: "wd:Q190712", year: "1914", wikiTitle: "First_Battle_of_the_Marne"},
  { label: "First Battle of Ypres", id: "wd:Q853976", year: "1914", wikiTitle: "First_Battle_of_Ypres"},
  { label: "Gallipoli Campaign", id: "wd:Q164983", year: "1915", wikiTitle: "Gallipoli_Campaign"},
  { label: "Battle of Verdun", id: "wd:Q130847", year: "1916", wikiTitle: "Battle_of_Verdun"},
  { label: "Battle of the Somme", id: "wd:Q132568", year: "1916", wikiTitle: "Battle_of_the_Somme" },
  { label: "First Battle of Passchendaele", id: "wd:Q3921580", year: "1917", wikiTitle: "First_Battle_of_Passchendaele"},
  { label: "Russian Revolution", id: "wd:Q8729", year: "1917", wikiTitle: "Russian_Revolution"},
  { label: "Armistice of Compiègne", id: "wd:Q253224", year: "1918", wikiTitle: "Armistice_of_Compi%C3%A8gne"},
  { label: "Spring Offensive", id: "wd:Q750567", year: "1918", wikiTitle: "German_spring_offensive"},
  { label: "Battle of Tannenberg", id: "wd:Q153858", year: "1914", wikiTitle: "Battle_of_Tannenberg"},
  { label: "Treaty of Versailles", id: "wd:Q8736", year: "1919", wikiTitle: "Treaty_of_Versailles"},
  // French Revolution
  { label: "Tennis Court Oath", id: "wd:Q60022", year: "1789", wikiTitle: "Tennis_Court_Oath"},
  { label: "Storming of the Bastille", id: "wd:Q6539", year: "1789", wikiTitle: "Storming_of_the_Bastille"},
  { label: "Insurrection of 10 August 1792", id: "wd:Q1154330", year: "1792", wikiTitle: "Insurrection_of_10_August_1792"},
  { label: "Reign of Terror begins", id: "wd:Q193547", year: "1793", wikiTitle: "Reign_of_Terror"},
  { label: "Fall of Maximilien Robespierre", id: "wd:Q3062706", year: "1794", wikiTitle: "Fall_of_Maximilien_Robespierre"},
  { label: "Champ de Mars Massacre", id: "wd:Q1089686", year: "1791", wikiTitle: "Champ_de_Mars_massacre"},
  { label: "September Massacres", id: "wd:Q862586", year: "1792", wikiTitle: "September_Massacres"},
  // Napoleonic Wars
  { label: "Battle of Trafalgar", id: "wd:Q171416", year: "1805", wikiTitle: "Battle_of_Trafalgar" },
  { label: "Battle of Austerlitz", id: "wd:Q134114", year: "1805", wikiTitle: "Battle_of_Austerlitz" },
  { label: "Battle of Jena–Auerstedt", id: "wd:Q154426", year: "1806", wikiTitle: "Battle_of_Jena–Auerstedt" },
  { label: "Peninsular War", id: "wd:Q152499", year: "1808", wikiTitle: "Peninsular_War" },
  { label: "Battle of Aspern-Essling", id: "wd:Q541626", year: "1809", wikiTitle: "Battle_of_Aspern–Essling" },
  { label: "Battle of Borodino", id: "wd:Q184320", year: "1812", wikiTitle: "Battle_of_Borodino" },
  { label: "Battle of Leipzig", id: "wd:Q151005", year: "1813", wikiTitle: "Battle_of_Leipzig" },
  { label: "Battle of Waterloo", id: "wd:Q48314", year: "1815", wikiTitle: "Battle_of_Waterloo" },
  { label: "Treaty of Fontainebleau", id: "wd:Q690989", year: "1814", wikiTitle: "Treaty_of_Fontainebleau_(1814)" },
  { label: "French invasion of Russia", id: "wd:Q179250", year: "1812", wikiTitle: "French_invasion_of_Russia" },
  // Roman Empire
  { label: "Battle of the Teutoburg Forest", id: "wd:Q87779", year: "9", wikiTitle: "Battle_of_the_Teutoburg_Forest" },
  { label: "Great Fire of Rome", id: "wd:Q215231", year: "64", wikiTitle: "Great_Fire_of_Rome" },
  { label: "Siege of Masada", id: "wd:Q3555020", year: "73", wikiTitle: "Siege_of_Masada" },
  { label: "Eruption of Mount Vesuvius", id: "wd:Q2411998", year: "79", wikiTitle: "Eruption_of_Mount_Vesuvius_in_79_AD" },
  { label: "Sack of Rome by the Visigoths", id: "wd:Q1463845", year: "410", wikiTitle: "Sack_of_Rome_(410)" },
  { label: "Battle of the Milvian Bridge", id: "wd:Q339321", year: "312", wikiTitle: "Battle_of_the_Milvian_Bridge" },
  { label: "Assassination of Julius Caesar", id: "wd:Q1025466", year: "44 BC", wikiTitle: "Assassination_of_Julius_Caesar" },
  { label: "Battle of Actium", id: "wd:Q160387", year: "31 BC", wikiTitle: "Battle_of_Actium" },
  { label: "Battle of the Catalaunian Plains", id: "wd:Q139808", year: "451", wikiTitle: "Battle_of_the_Catalaunian_Plains" },
]

