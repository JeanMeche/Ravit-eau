import { LatLngBounds } from 'leaflet';
import { createContext, useState } from 'react';
import { DrikingWaterSpot, searchWaterSpots } from './overpass.service';

export type MapElementsContext = {
  drikingWater: Map<number, DrikingWaterSpot>;
  isLoading: boolean;
  searchSpots(bounds: LatLngBounds): void;
};

export const MapContext = createContext<MapElementsContext | null>(null);

export const MapProvider = ({ children }: { children: any }) => {
  const [drikingWater, setDrikingWater] = useState<Map<number, DrikingWaterSpot>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  const searchSpots = async (bounds: LatLngBounds) => {
    setIsLoading(true);
    try {
      const spots = await searchWaterSpots({
        south: bounds.getSouth(),
        east: bounds.getEast(),
        north: bounds.getNorth(),
        west: bounds.getWest(),
      });
      setDrikingWater(new Map([...drikingWater, ...spots.map((s): [number, DrikingWaterSpot] => [s.id, s])]));
      setIsLoading(false);
    } catch {}
  };

  return <MapContext.Provider value={{ isLoading, drikingWater, searchSpots }}>{children}</MapContext.Provider>;
};
