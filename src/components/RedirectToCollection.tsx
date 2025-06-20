import {Navigate, useLocation, useParams} from "react-router-dom";

export function RedirectToCollection() {
  const { collectionId } = useParams();
  const location = useLocation();
  
  const getQuery = () => {
    let search = location.search;
    
    if (!search) {
      const query = new URLSearchParams(search).get('q');
      if (query) {
        return `?q=${encodeURIComponent(query)}`;
      }
    }
    return search;
  }
  
  return <Navigate to={`/collections/${collectionId}${getQuery()}`} replace />;
}
