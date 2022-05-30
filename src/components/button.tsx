import { MouseEventHandler } from 'react';

export const Button = (props: { onClick?: MouseEventHandler<HTMLButtonElement>; children: any }) => {
  return (
    <button
      type="button"
      className="py-2.5 px-2.5 text-sm font-medium rounded-lg border focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 bg-gray-800 text-gray-400 border-gray-600 inline-flex items-center pointer-events-auto"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
