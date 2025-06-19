import './App.css'
import MapView from "./components/MapView.tsx";
import {EventProvider} from "@/components/MapContext.tsx";
import {SideMenu} from "@/components/SideMenu.tsx";
import {Layout} from "@/components/Layout/Layout.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

function App() {
  return (
    <EventProvider>
      <Layout>
        <SideMenu />
      </Layout>
      <MapView />
      <Toaster />
    </EventProvider>
  )
}

export default App
