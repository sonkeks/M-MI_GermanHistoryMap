const query = `
SELECT ?event ?eventLabel ?date ?locationLabel ?coord WHERE {
  ?event wdt:P31 wd:Q1190554.
  ?event wdt:P276 ?location.
  ?location wdt:P17 wd:Q183.  # P17 = Land; Q183 = Deutschland
  ?location wdt:P625 ?coord.
  OPTIONAL { ?event wdt:P585 ?date. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "de,en". }
}
LIMIT 10
`;

export async function getEvents() {
  await fetchWikidataSPARQL()
}

async function fetchWikidataSPARQL() {
  const response = await fetch("https://query.wikidata.org/sparql", {
    method: "POST",
    headers: {
      "Content-Type": "application/sparql-query",
      "Accept": "application/json"
    },
    body: query
  });
  
  const data = await response.json();
  console.log(data);
}
