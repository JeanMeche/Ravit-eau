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
        const tags = water.tags;
        const hasTags = Object.values(tags).filter((v) => v != undefined).length > 0;
        return (
          <Marker position={water.position} key={water.id}>
            {hasTags && (
              <Popup>
                <ul>
                  {tags.fee && <li>Fee: {tags.fee}</li>}
                  {tags.access && <li>Access: {tags.access}</li>}
                  {tags.bottle && <li>Bottle: {tags.bottle}</li>}
                  {tags.man_made && <li>Man made: {tags.man_made}</li>}
                </ul>
              </Popup>
            )}
          </Marker>
        );
      })}
    </div>
  );
};