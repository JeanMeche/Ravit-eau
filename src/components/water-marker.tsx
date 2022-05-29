import { debounce } from 'lodash-es';
import { useCallback, useContext } from 'react';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { MapContext, MapElementsContext } from '../service/map.provider';

export const WaterMarkers = () => {
  const { searchSpots, drikingWater } = useContext(MapContext) as MapElementsContext;
  const map = useMap();

  const debouncePan = useCallback(
    debounce(() => {
      searchSpots(map.getBounds());
    }, 500),
    []
  );

  useMapEvents({
    moveend() {
      debouncePan();
    },
  });

  return (
    <div>
      {[...drikingWater.values()].map((water) => {
        return (
          <Marker position={water.position} key={water.id}>
            <Popup>
              <ul>
                <li>Fee: {water.tags.fee}</li>
                <li>Access: {water.tags.access}</li>
                <li>Bottle: {water.tags.bottle}</li>
                <li>Man made: {water.tags.man_made}</li>
              </ul>
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};
