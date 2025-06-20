import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css';
import App from './App.tsx'
import {Provider} from "@/components/ui/provider.tsx";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {EventDetails} from "@/components/EventDetails/EventDetails.tsx";
import {SearchLayout} from "@/components/SearchLayout/SearchLayout.tsx";
import {Events} from "@/components/Events/Events.tsx";
import {Collections} from "@/components/Collections/Collections.tsx";
import {CollectionDetails} from "@/components/CollectionDetails/CollectionDetails.tsx";
import {RedirectToCollection} from "@/components/RedirectToCollection.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route element={<SearchLayout />}>
              <Route index element={<Navigate to="collections" replace />} />
              <Route path="events" element={<Events />}/>
              <Route path="events/:eventId" element={<EventDetails />}/>
              <Route path="collections" element={<Collections />} />
              <Route path="collections/:collectionId" element={<CollectionDetails />} />
              <Route path="collections/:collectionId/collectionEvents" element={<RedirectToCollection />} />
              <Route path="collections/:collectionId/collectionEvents/:eventId" element={<EventDetails />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>,
)
