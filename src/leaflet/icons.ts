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

export const redLocationIcon = divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve">
    <path style="fill:#FF6465;" d="M255.999,0C166.683,0,94.278,72.405,94.278,161.722c0,81.26,62.972,235.206,161.722,350.278
    c98.75-115.071,161.722-269.018,161.722-350.278C417.722,72.405,345.316,0,255.999,0z"/>
    <g style="opacity:0.1;">
      <path d="M168.207,125.87c15.735-64.065,67.63-109.741,128.634-120.664C283.794,1.811,270.109,0,255.999,0
        C166.683,0,94.277,72.405,94.277,161.722c0,73.715,51.824,207.247,135.167,317.311C170.39,349.158,150.032,199.872,168.207,125.87z
        "/>
    </g>
    <path style="fill:#FFFFFF;" d="M255.999,235.715c-40.81,0-74.014-33.203-74.019-74.014c0.005-40.795,33.209-73.998,74.019-73.998
    s74.014,33.203,74.019,74.014C330.015,202.513,296.809,235.715,255.999,235.715z"/>
  </svg>`,
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});

export const blueLocationIcon = divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve">
    <path style="fill:#38f;" d="M255.999,0C166.683,0,94.278,72.405,94.278,161.722c0,81.26,62.972,235.206,161.722,350.278
    c98.75-115.071,161.722-269.018,161.722-350.278C417.722,72.405,345.316,0,255.999,0z"/>
    <g style="opacity:0.1;">
      <path d="M168.207,125.87c15.735-64.065,67.63-109.741,128.634-120.664C283.794,1.811,270.109,0,255.999,0
        C166.683,0,94.277,72.405,94.277,161.722c0,73.715,51.824,207.247,135.167,317.311C170.39,349.158,150.032,199.872,168.207,125.87z
        "/>
    </g>
    <path style="fill:#FFFFFF;" d="M255.999,235.715c-40.81,0-74.014-33.203-74.019-74.014c0.005-40.795,33.209-73.998,74.019-73.998
    s74.014,33.203,74.019,74.014C330.015,202.513,296.809,235.715,255.999,235.715z"/>
  </svg>`,
  className: '',
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
  popupAnchor: [0, -size],
});
