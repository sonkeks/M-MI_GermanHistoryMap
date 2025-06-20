import {type FunctionComponent, useEffect, useState} from "react";
import {Button, Card, EmptyState, Flex, Text, VStack} from "@chakra-ui/react";
import "./Collections.css";
import {useSearch} from "@/hooks/useSearch.ts";
import {useLocation, useNavigate} from "react-router-dom";
import type {HistoricCollection} from "@/components/types.ts";
import {historicCollections} from "@/components/data.ts";
import {filterCollections} from "@/utility/searchHelper.ts";
import {TbSearchOff} from "react-icons/tb";

export const Collections: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collections, setCollections] = useState<HistoricCollection[]>([]);
  const {searchValue} = useSearch();
  
  useEffect(() => {
    let collections = historicCollections;
    if (searchValue !== "") {
      collections = filterCollections(searchValue);
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
          <Card.Body>
            <Card.Title mt="2">{collection.title}</Card.Title>
            <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={4}>
              {collection.startDate.toLocaleDateString()} - {collection.endDate.toLocaleDateString()}
            </Text>
            <Card.Description>
              {collection.description}
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" onClick={() => handleCollectionSelect(collection.id)}>View {collection.historicEvents.length} Events</Button>
          </Card.Footer>
        </Card.Root>
      )}
      {collections.length === 0 && searchValue !== "" && (
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <TbSearchOff />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>No Search Results</EmptyState.Title>
              <EmptyState.Description style={{maxWidth: '200px'}}>
                Sorry, your query did not find any Collections in the List
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
    </Flex>
  )
}
