import {type FunctionComponent, useEffect, useState} from "react";
import {Button, Card, Flex} from "@chakra-ui/react";
import "./Collections.css";
import {useSearch} from "@/hooks/useSearch.ts";
import {useLocation, useNavigate} from "react-router-dom";
import type {HistoricCollection} from "@/components/types.ts";
import {historicCollections} from "@/components/data.ts";

export const Collections: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collections, setCollections] = useState<HistoricCollection[]>([]);
  const {searchValue} = useSearch();
  
  useEffect(() => {
    let collections = historicCollections;
    if (searchValue !== "") {
      collections = collections.filter(item => item.title.includes(searchValue));
    }
    setCollections(collections);
  }, [searchValue]);
  
  const handleCollectionSelect = (collectionId: string) => {
    navigate(`/collections/${collectionId}${location.search}`);
  }
  
  return (
    <Flex className="container" gap="3" direction="column">
      {collections.map(collection =>
        <Card.Root key={collection.id}>
          <Card.Body gap="2">
            <Card.Title mt="2">{collection.title}</Card.Title>
            <Card.Description>
              {collection.description}
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" onClick={() => handleCollectionSelect(collection.id)}>View {collection.historicEvents.length} Events</Button>
          </Card.Footer>
        </Card.Root>
      )}
    </Flex>
  )
}
