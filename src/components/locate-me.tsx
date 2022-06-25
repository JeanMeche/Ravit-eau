import { useMap } from 'react-leaflet';

export const LocateMe = () => {
  const map = useMap();

  return (
    <div className="w-full flex items-start justify-end p-1 overflow-hidden fixed z-overmap">
      <button
        type="button"
        className="py-2.5 px-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 inline-flex items-center"
        onClick={() => map.locate()}
      >
        <svg height="24px" viewBox="0 0 24 24" width="24px" fill="grey">
          <g>
            <path d="M10.368,19.102c0.349,1.049,1.011,1.086,1.478,0.086l5.309-11.375c0.467-1.002,0.034-1.434-0.967-0.967L4.812,12.154   c-1.001,0.467-0.963,1.129,0.085,1.479L9,15L10.368,19.102z" />
          </g>
        </svg>
      </button>
    </div>
  );
};
