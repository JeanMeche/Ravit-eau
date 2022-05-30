import { Map } from './components/map';
import { SidebarProvider } from './components/sidebar';
import { leafletSetup } from './leaflet/leaflet-setup';
import { MapProvider } from './service/map.provider';

leafletSetup();

function App() {
  return (
    <div className="App">
      <MapProvider>
        <SidebarProvider>
          <Map></Map>
        </SidebarProvider>
      </MapProvider>
    </div>
  );
}

export default App;
