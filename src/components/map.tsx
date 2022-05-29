import 'leaflet/dist/leaflet.css';
import { useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapContext, MapElementsContext } from '../service/map.provider';
import { Loader } from './loader';
import { LocationMarker } from './location-marker';
import './map.css';
import { WaterMarkers } from './water-marker';

export function Map() {
  const { isLoading } = useContext(MapContext) as MapElementsContext;

  return (
    <div id="map">
      <div className="loader-wrapper w-full flex items-end justify-center p-1 overflow-hidden pointer-events-none fixed">
        {isLoading && <Loader></Loader>}
      </div>
      <MapContainer center={[51.505, -0.09]} zoom={15}>
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
