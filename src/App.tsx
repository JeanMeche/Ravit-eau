import { Map } from './components/map';
import { leafletSetup } from './misc/leaflet-setup';
import { MapProvider } from './service/map.provider';

leafletSetup();

function App() {
  return (
    <div className="App">
      <MapProvider>
        <Map></Map>
      </MapProvider>
    </div>
  );
}

export default App;
