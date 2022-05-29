import L, { Circle, LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import { userIcon } from '../leaflet/icons';

export const LocationMarker = () => {
  const [position, setPosition] = useState<LatLng>();
  const [_, setBbox] = useState<Array<string>>([]);

  const map = useMap();

  useEffect(() => {
    let locationCircle: Circle; // FIXME: probably should'nt use local var
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng);
      map.panTo(e.latlng);
      const radius = e.accuracy;
      if (locationCircle) {
        locationCircle.removeFrom(map);
      }

      locationCircle = L.circle(e.latlng, radius, { fillOpacity: 0.1 });
      locationCircle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(','));
    });
  }, [map]);

  return position === null ? null : <Marker icon={userIcon} position={position ?? new LatLng(45, 5)}></Marker>;
};
