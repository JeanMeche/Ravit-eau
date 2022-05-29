import L, { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';

export const LocationMarker = () => {
  const [position, setPosition] = useState<LatLng>();
  const [bbox, setBbox] = useState<Array<string>>([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng);
      map.panTo(e.latlng);
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(','));
    });
  }, [map]);

  return position === null ? null : <Marker position={position ?? new LatLng(45, 5)}></Marker>;
};
