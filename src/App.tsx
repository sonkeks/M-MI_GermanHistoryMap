import './App.css'
import MapView from "./components/MapView.tsx";
import {EventProvider} from "@/components/EventContext.tsx";
import {Header} from "@/components/Header.tsx";

function App() {
  return (
    <EventProvider>
      <Header />
      <MapView />
    </EventProvider>
  )
}

export default App
