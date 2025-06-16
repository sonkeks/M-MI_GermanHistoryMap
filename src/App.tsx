import './App.css'
import MapView from "./components/MapView.tsx";
import {EventProvider} from "@/components/EventContext.tsx";
import {SideMenu} from "@/components/SideMenu.tsx";

function App() {
  return (
    <EventProvider>
      <SideMenu />
      <MapView />
    </EventProvider>
  )
}

export default App
