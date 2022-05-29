import { getBoundsOfDistance, getCenterOfBounds, getDistance } from 'geolib';
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

const maxDiagonalDistance = 15000;
const maxDistanceFromCenter = 7500;

export const searchWaterSpots = (bounds: OverpassBounds): Promise<Array<DrikingWaterSpot>> => {
  const sanitizedBounds = getBounds(bounds);
  const rect = [sanitizedBounds.south, sanitizedBounds.west, sanitizedBounds.north, sanitizedBounds.east].join(',');

  const url = `https://www.overpass-api.de/api/interpreter?data=[out:json];node["amenity"="drinking_water"](${rect});out body;`;

  return fetch(url).then(async (resp) => {
    const json: { elements: Array<OverpassElement> } = await resp.json();
    return json.elements.map((e): DrikingWaterSpot => {
      return { position: new LatLng(e.lat, e.lon), id: e.id, tags: parseTags(e.tags) };
    });
  });
};

function getBounds(bounds: OverpassBounds) {
  const topLeft = { latitude: bounds.north, longitude: bounds.west };
  const topRight = { latitude: bounds.north, longitude: bounds.east };
  const bottomLeft = { latitude: bounds.south, longitude: bounds.west };
  const bottomRight = { latitude: bounds.south, longitude: bounds.east };

  const diagonalDistance = getDistance(topLeft, bottomRight);
  if (diagonalDistance < maxDiagonalDistance) {
    return bounds;
  }

  const center = getCenterOfBounds([topLeft, topRight, bottomRight, bottomLeft]);
  return getResonableBounds(center);
}

function getResonableBounds(location: { latitude: number; longitude: number }): OverpassBounds {
  const [sw, ne] = getBoundsOfDistance(location, maxDistanceFromCenter);

  return { east: ne.longitude, north: ne.latitude, south: sw.latitude, west: sw.longitude };
}

function parseTags(tags: OverpassTags): WaterSpotTags {
  return {
    access: tags.access ? tags.access === 'yes' : undefined,
    bottle: tags.bottle ? tags.bottle === 'yes' : undefined,
    fee: tags.fee ? tags.fee === 'yes' : undefined,
  };
}
