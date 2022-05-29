import { divIcon } from 'leaflet';

const size = 32;

export const userIcon = divIcon({
  html: `
  <svg viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="4" fill="#fff"/>
    <circle cx="5" cy="5" r="2" fill="#1981FB">
      <animate attributeName="r" begin="0s" dur="5s" repeatCount="indefinite" values="1.5;3;1.5"/>
    </circle>
  </svg>`,
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size / 2],
});
