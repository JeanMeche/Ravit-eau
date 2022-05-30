import { DivIcon } from 'leaflet';
import { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import {
  blueLocationIcon,
  bluePlusLocationIcon,
  greenLocationIcon,
  redLocationIcon,
  yellowLocationIcon,
} from '../leaflet/icons';
import { MapContext, MapElementsContext } from '../service/map.provider';
import { WaterSpotTags } from '../service/overpass.service';

export const WaterMarkers = () => {
  const { drikingWater } = (useContext(MapContext) as MapElementsContext) || { drikingWater: new Map() };

  return (
    <div>
      {[...drikingWater.values()].map((water) => {
        const tags = water.tags;
        const hasTags =
          Object.entries(tags).filter(
            ([k, v]) => (k !== 'outOfOrder' && v != undefined) || (k === 'outOfOrder' && v === true)
          ).length > 0;
        return (
          <Marker icon={getIcon(tags, hasTags)} position={water.position} key={water.id}>
            {hasTags && (
              <Popup minWidth={200}>
                {/* {JSON.stringify(tags)} */}
                {tags.name && <h2>{tags.name}</h2>}

                {tags.image && <img src={tags.image} width="200px"></img>}

                <ul>
                  {tags.fee !== undefined && <li>Fee: {tags.fee ? 'Yes' : 'No'}</li>}
                  {tags.restrictedAccess && <li>Access: {tags.restrictedAccess}</li>}
                  {tags.bottle !== undefined && <li>Bottle: {tags.bottle ? 'Yes' : 'No'}</li>}
                  {tags.outOfOrder && <li className="text-red-900">Out of order</li>}
                  {tags.seasonal && <li className="text-yellow-900">Seasonal</li>}
                  {tags.openingHours && <li>Open: {tags.openingHours}</li>}
                  {tags.isSparking && <li> Sparkling !!! </li>}
                  {tags.noDrinking && <li> No Drinking =( </li>}
                </ul>
              </Popup>
            )}
          </Marker>
        );
      })}
    </div>
  );
};

function getIcon(tags: WaterSpotTags, hasTags: boolean): DivIcon {
  if (tags.outOfOrder || tags.noDrinking) {
    return redLocationIcon;
  }
  if (tags.restrictedAccess || tags.seasonal) {
    return yellowLocationIcon;
  }

  if (tags.image || tags.isSparking) {
    return greenLocationIcon;
  }

  if (hasTags) {
    return bluePlusLocationIcon;
  }

  return blueLocationIcon;
}
