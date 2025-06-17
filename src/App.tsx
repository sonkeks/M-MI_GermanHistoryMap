import './App.css'
import MapView from "./components/MapView.tsx";
import {EventProvider} from "@/components/EventContext.tsx";
import {SideMenu} from "@/components/SideMenu.tsx";
import {Layout} from "@/components/Layout/Layout.tsx";

function App() {
  return (
    <EventProvider>
      <Layout>
        <SideMenu />
      </Layout>
      <MapView />
    </EventProvider>
  )
}

export default App
