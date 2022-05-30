import { debounce } from 'lodash-es';
import { useCallback, useContext, useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { MapContext } from '../service/map.provider';

export const PanListener = () => {
  const map = useMap();
  const { searchSpots } = useContext(MapContext) || { searchSpots: () => {} };

  useEffect(() => {
    searchSpots(map.getBounds());
  }, []);

  const debouncePan = useCallback(
    debounce(() => {
      const center = map.getCenter();
      window.history.replaceState(null, 'New Page Title', `/${center.lat.toPrecision(7)}/${center.lng.toPrecision(7)}`);
      searchSpots(map.getBounds());
    }, 500),
    []
  );

  useMapEvents({
    moveend() {
      debouncePan();
    },
  });

  return <></>;
};
