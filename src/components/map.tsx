import 'leaflet/dist/leaflet.css';
import { useContext, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { Button } from './button';
import { LocateMeOnLoad } from './locate-me-on-load';
import { LocationMarker } from './location-marker';
import { MapButtonWrapper } from './map-buttons-wrapper';
import { MapLoader } from './map-loader';
import './map.css';
import { PanListener } from './pan-listener';
import { Sidebar, SidebarContext, SidebarContextType } from './sidebar';
import { WaterMarkers } from './water-marker';

export function Map() {
  const [map, setMap] = useState<L.Map | null>(null);
  const { toggleSidebar } = useContext(SidebarContext) as SidebarContextType;

  const { lat, lng, zoom } = useParams();

  const coords: [number, number] = [+(lat ?? 51.505), +(lng ?? -0.09)];

  const onLocateClick = (): void => {
    map?.locate().on('locationfound', (e) => {
      map.panTo(e.latlng);
    });
  };

  return (
    <div id="map" className="h-screen	relative">
      <Sidebar></Sidebar>
      <MapContainer center={coords} zoom={+(zoom ?? 15)} ref={setMap}>
        <PanListener />
        <LocateMeOnLoad />
        <MapButtonWrapper>
          <Button onClick={() => onLocateClick()}>
            <svg viewBox="0 0 24 24" width="24px" fill="#fff">
              <g>
                <path d="M10.368,19.102c0.349,1.049,1.011,1.086,1.478,0.086l5.309-11.375c0.467-1.002,0.034-1.434-0.967-0.967L4.812,12.154   c-1.001,0.467-0.963,1.129,0.085,1.479L9,15L10.368,19.102z" />
              </g>
            </svg>
          </Button>
          <Button onClick={() => toggleSidebar()}>
            <svg viewBox="0 0 32 32" width="24px">
              <path
                fill="#ffffff"
                d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
              />
            </svg>
          </Button>
        </MapButtonWrapper>
        <MapLoader />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <WaterMarkers />
      </MapContainer>
    </div>
  );
}
