import type {EventLocation, HistoricEvent} from "@/components/types.ts";
import type {LatLngTuple} from "leaflet";

function buildDetailsQuery(id: HistoricEvent['id']): string {
  return `
    SELECT ?event ?eventLabel ?eventDescription
           ?startDate ?endDate
           ?location ?locationLabel ?coordinate ?image
           ?eventArticle
    WHERE {
      VALUES ?event { ${id} }

      OPTIONAL { ?event wdt:P585 ?startDate. }       # point in time
      OPTIONAL { ?event wdt:P582 ?endDate. }         # end date
      OPTIONAL { ?event wdt:P276 ?location. }        # location
      OPTIONAL { ?location wdt:P625 ?coordinate. }   # coordinate location
      OPTIONAL { ?location wdt:P18 ?image. }         # image of the location

      OPTIONAL {
        ?eventArticle schema:about ?event ;
                      schema:isPartOf <https://en.wikipedia.org/> .
      }

      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
  `;
}

async function fetchWikidataSPARQL(query: string): Promise<EventLocation[]> {
  const response = await fetch("https://query.wikidata.org/sparql", {
    method: "POST",
    headers: {
      "Content-Type": "application/sparql-query",
      "Accept": "application/sparql-results+json"
    },
    body: query
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data.results.bindings;
}

export async function getEventData(id: HistoricEvent['id']) {
  const query = buildDetailsQuery(id);
  return fetchWikidataSPARQL(query);
}

export function pointStringToLatLngTuple(point: string): LatLngTuple {
  const cleaned = point.replace("Point(", "").replace(")", "");
  
  const [x, y] = cleaned.split(" ").map(Number);
  
  return [y, x];
}

