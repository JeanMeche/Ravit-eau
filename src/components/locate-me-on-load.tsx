import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useParams } from 'react-router-dom';

export const LocateMeOnLoad = () => {
  const map = useMap();
  const { lat, lng, zoom } = useParams();

  useEffect(() => {
    if (lat || lng || zoom) {
      return;
    }

    map?.locate().on('locationfound', function (e) {
      map.panTo(e.latlng);
    });
  }, []);

  return <></>;
};
