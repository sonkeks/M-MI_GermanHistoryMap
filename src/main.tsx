import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css';
import App from './App.tsx'
import {Provider} from "@/components/ui/provider.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {EventDetails} from "@/components/EventDetails/EventDetails.tsx";
import {SearchLayout} from "@/components/SearchLayout/SearchLayout.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route element={<SearchLayout />}>
              <Route index />
              <Route path="events" />
              <Route path="events/:eventId" element={<EventDetails />}/>
              <Route path="collections" />
              <Route path="collections/:collectionId" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
