import { useCallback, useState } from 'react';

export const useSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, []);

  return [showSidebar, toggleSidebar] as const;
};

export const Sidebar = () => {
  const [showSidebar, toggleSidebar] = useSidebar();

  return (
    <aside
      className={`top-0 right-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full  ease-in-out duration-300 z-panel ${
        showSidebar ? 'translate-x-0 ' : 'translate-x-full'
      }`}
    >
      <button
        className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
        onClick={() => toggleSidebar()}
      >
        x
      </button>

      <h3 className="mt-20 text-4xl font-semibold text-white">I am a sidebar</h3>
    </aside>
  );
};
