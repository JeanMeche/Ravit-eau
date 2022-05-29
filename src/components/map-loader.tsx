import { useContext } from 'react';
import { MapContext, MapElementsContext } from '../service/map.provider';
import { Loader } from './loader';

export const MapLoader = () => {
  const { isLoading } = useContext(MapContext) as MapElementsContext;

  return (
    <div className="loader-wrapper w-full flex items-end justify-center p-1 overflow-hidden pointer-events-none fixed z-overmap">
      {isLoading && <Loader></Loader>}
    </div>
  );
};
