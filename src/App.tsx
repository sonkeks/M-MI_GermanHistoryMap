import './App.css'
import MapView from "./components/MapView.tsx";
import {Header} from "@/components/Header.tsx";
import {Box} from "@chakra-ui/react";

function App() {
  return (
    <div>
      <Box id="top-controls" className="layout">
        <Header />
      </Box>
      <MapView />
      <Box id="bottom-controls" className="layout">
        Footer
      </Box>
    </div>
  )
}

export default App
