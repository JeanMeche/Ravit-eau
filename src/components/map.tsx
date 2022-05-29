import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocateMe } from './locate-me';
import { LocationMarker } from './location-marker';
import { MapLoader } from './map-loader';
import './map.css';
import { WaterMarkers } from './water-marker';

export function Map() {
  return (
    <div id="map" className="h-screen	relative">
      <MapContainer center={[51.505, -0.09]} zoom={15}>
        <LocateMe></LocateMe>
        <MapLoader></MapLoader>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker></LocationMarker>
        <WaterMarkers></WaterMarkers>
      </MapContainer>
    </div>
  );
}
