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
  access?: 'private' | 'customers' | 'restricted' | 'permissive' | 'yes';
  amenity?: 'drinking_water';
  bottle?: 'yes' | 'no';
  fee?: 'yes' | 'no';
  man_made?: 'water_tap';
  wheelchair?: 'yes' | 'no' | 'limited';
  name?: string;
  indoor?: 'no' | 'yes';
  drinking_water?: 'yes';
  natural?: 'spring';
  disused?: 'no' | 'yes';
  working?: 'no' | 'yes';
  seasonal?: 'no' | 'yes';
  opening_hours?: string;
  image?: string;
  wikimedia_commons?: string; // TODO: Request url from https://en.wikipedia.org/w/api.php?action=query&titles=File:Albert_Einstein_Head.jpg&prop=imageinfo&iiprop=url
  'drink:sparkling_water'?: 'yes' | 'no';
  'drinking_water:legal'?: 'yes' | 'no';
  operational_status?: 'out_of_order';
};

export type DrikingWaterSpot = {
  position: LatLng;
  id: number;
  tags: WaterSpotTags;
};

export type WaterSpotTags = {
  name?: string;
  fee?: true;
  bottle?: boolean;
  restrictedAccess?: 'private' | 'customers' | 'restricted' | 'permissive';
  outOfOrder?: true;
  image?: string;
  seasonal?: true;
  openingHours?: string;
  isSparking?: true;
  noDrinking?: true;
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

const filter = [
  'bottle',
  'fee',
  'man_made',
  'amenity',
  'check_date',
  'source',
  'note',
  'name',
  'survey',
  'survey:date',
  'wheelchair',
  'description',
  'drinking_water:seasonal',
  'natural',
  'indoor',
  'drinking_water',
  'amenity_1',
  'operator',
  'disused',
  'working',
  'source:date',
  'mapillary',
  'name:en',
  'name:fr',
  'name:de',
  'cold_water',
  'ele',
  'fire_hydrant:type',
  'ref',
  'operator:wikidata',
  'operator:wikipedia',
  'wikipedia',
  'wikidata',
  'level',
  'survey_date',
];
function parseTags(tags: OverpassTags): WaterSpotTags {
  const filtered = Object.entries(tags).filter(([k, v]) => !filter.includes(k));
  if (filtered.length > 0) {
    console.log(JSON.stringify(filtered));
  }
  return {
    restrictedAccess: tags.access !== 'yes' ? tags.access : undefined,
    bottle: tags.bottle ? tags.bottle === 'yes' : undefined,
    fee: tags.fee === 'yes' || undefined,
    outOfOrder: tags.working === 'no' || tags.operational_status === 'out_of_order' || undefined,
    name: tags.name,
    image: tags.image,
    seasonal: tags.seasonal === 'yes' || undefined,
    openingHours: tags.opening_hours,
    isSparking: tags['drink:sparkling_water'] === 'yes' || undefined,
    noDrinking: tags['drinking_water:legal'] === 'no' || undefined,
  };
}
