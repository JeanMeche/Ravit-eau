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

function coloredIcon(color: string, plus: boolean = false): string {
  return `<svg viewBox="0 0 512 512">
    <path style="fill:${color};" d="M255.999,0C166.683,0,94.278,72.405,94.278,161.722c0,81.26,62.972,235.206,161.722,350.278 c98.75-115.071,161.722-269.018,161.722-350.278C417.722,72.405,345.316,0,255.999,0z"/>
    <path style="opacity:0.1;" d="M168.207,125.87c15.735-64.065,67.63-109.741,128.634-120.664C283.794,1.811,270.109,0,255.999,0 C166.683,0,94.277,72.405,94.277,161.722c0,73.715,51.824,207.247,135.167,317.311C170.39,349.158,150.032,199.872,168.207,125.87z"/>
    <path style="fill:#FFFFFF;" d="M255.999,235.715c-40.81,0-74.014-33.203-74.019-74.014c0.005-40.795,33.209-73.998,74.019-73.998 s74.014,33.203,74.019,74.014C330.015,202.513,296.809,235.715,255.999,235.715z"/>
    ${
      plus
        ? '<path stroke="#000" d="m332.29,59.0777l59.15771,0l0,-59.15771l60.68458,0l0,59.15771l59.15772,0l0,60.68458l-59.15772,0l0,59.1577l-60.68458,0l0,-59.1577l-59.15771,0l0,-60.68458z" fill="#000000"/>'
        : ''
    }
    </svg>`;
}

export const bluePlusLocationIcon = divIcon({
  html: coloredIcon('#38f', true),
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

export const greenLocationIcon = divIcon({
  html: coloredIcon('#77d421', true),
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

export const blueLocationIcon = divIcon({
  html: coloredIcon('#38f'),
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

export const yellowLocationIcon = divIcon({
  html: coloredIcon('#e89c31', true),
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

export const redLocationIcon = divIcon({
  html: coloredIcon('#FF6465', true),
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});
