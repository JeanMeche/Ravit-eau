import { Map } from './components/map';
import { MapProvider } from './service/map.provider';

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
