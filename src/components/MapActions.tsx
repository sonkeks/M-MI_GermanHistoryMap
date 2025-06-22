import {type FunctionComponent, useContext} from "react";
import {ActionBar, Button} from "@chakra-ui/react";
import {MapContext} from "@/components/MapContext.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export const MapActions: FunctionComponent = () => {
  const {collectionId} = useParams();
  const {state, dispatch} = useContext(MapContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const getSelectionText = () => {
    if (state.highlightedLocations.length > 0) {
      return `${state.highlightedLocations.length} Location${state.highlightedLocations.length > 1 ? "s" : ""}`
    } else {
      const totalLocations = state.events.reduce((sum, event) => sum + event.locations.length, 0);
      return `${totalLocations} Location${totalLocations > 1 ? "s" : ""}`
    }
  }
  
  const handleResetSelection = () => {
    const query = state.currentSearchQuery ?`?q=${encodeURIComponent(state.currentSearchQuery)}` : "";
    if (state.selectedEvent) {
      dispatch({type: 'CLEAR_EVENT'});
      if (location.pathname.includes('events')) {
        navigate(`/events${query}`);
      }
      if (location.pathname.includes('collectionEvents')) {
        navigate(`/collections/${collectionId}${query}`)
      }
    } else if (state.selectedCollection) {
      dispatch({type: 'CLEAR_COLLECTION'})
      if (location.pathname.includes('collections')) {
        navigate(`/collections${query}`);
      }
    }
  }
  
  const handleResetHighlight = () => {
    if (state.highlightedLocations.length > 0) {
      dispatch({type: 'CLEAR_HIGHLIGHTS'});
    }
  }
  
  return (
    <ActionBar.Root open={state.events.length > 0}>
      <ActionBar.Positioner zIndex={1100}>
        <ActionBar.Content>
          <ActionBar.SelectionTrigger>
            {getSelectionText()}
          </ActionBar.SelectionTrigger>
          <ActionBar.Separator />
          {state.highlightedLocations.length > 0
          ? (
              <Button variant="outline" size="sm" onClick={handleResetHighlight}>
                Clear Highlight
              </Button>
            )
          : (
              <Button variant="outline" size="sm" onClick={handleResetSelection}>
                Deselect
              </Button>
            )
          }
        </ActionBar.Content>
      </ActionBar.Positioner>
    </ActionBar.Root>
  )
}
