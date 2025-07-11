import './App.css'
import MapView from "./components/MapView/MapView.tsx";
import {EventProvider} from "@/components/MapContext.tsx";
import {SideMenu} from "@/components/SideMenu/SideMenu.tsx";
import {Layout} from "@/components/Layout/Layout.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {MapActions} from "@/components/MapActions.tsx";

function App() {
  return (
    <EventProvider>
      <Layout>
        <SideMenu />
      </Layout>
      <MapView />
      <MapActions/>
      <Toaster />
    </EventProvider>
  )
}

export default App
