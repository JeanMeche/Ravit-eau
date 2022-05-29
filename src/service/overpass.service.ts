import { LatLng } from 'leaflet';

export type OverpassBounds = {
  south: number;
  west: number;
  north: number;
  east: number;
};

export type OverpassElement = {
  id: number;
  lat: number;
  lon: number;
  tags: OverpassTags;
};

export type OverpassTags = {
  access?: 'yes' | 'no';
  amenity?: 'drinking_water';
  bottle?: 'yes' | 'no';
  fee?: 'yes' | 'no';
  man_made?: 'water_tap';
};

export type DrikingWaterSpot = {
  position: LatLng;
  id: number;
  tags: WaterSpotTags;
};

export type WaterSpotTags = {
  fee?: boolean;
  bottle?: boolean;
  access?: boolean;
  //man_made?: boolean;
};

export const searchWaterSpots = (bounds: OverpassBounds): Promise<Array<DrikingWaterSpot>> => {
  const rect = [bounds.south, bounds.west, bounds.north, bounds.east].join(',');

  const url = `https://www.overpass-api.de/api/interpreter?data=[out:json];node["amenity"="drinking_water"](${rect});out body;`;

  return fetch(url).then(async (resp) => {
    const json: { elements: Array<OverpassElement> } = await resp.json();
    return json.elements.map((e): DrikingWaterSpot => {
      return { position: new LatLng(e.lat, e.lon), id: e.id, tags: parseTags(e.tags) };
    });
  });
};

function parseTags(tags: OverpassTags): WaterSpotTags {
  return {
    access: tags.access ? tags.access === 'yes' : undefined,
    bottle: tags.bottle ? tags.bottle === 'yes' : undefined,
    fee: tags.fee ? tags.fee === 'yes' : undefined,
    //man_made: tags.man_made ? tags.man_made === 'yes' : undefined,
  };
}
