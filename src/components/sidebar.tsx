import { createContext, useCallback, useContext, useState } from 'react';

export type SidebarContextType = {
  isVisible: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleSidebar = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return <SidebarContext.Provider value={{ isVisible, toggleSidebar }}>{children}</SidebarContext.Provider>;
};

export const Sidebar = () => {
  const { isVisible, toggleSidebar } = useContext(SidebarContext) as SidebarContextType;

  return (
    <aside
      className={`top-0 right-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full  ease-in-out duration-300 z-panel ${
        isVisible ? 'translate-x-0 ' : 'translate-x-full'
      }`}
    >
      <button
        className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
        onClick={toggleSidebar}
      >
        x
      </button>

      <h3 className="mt-20 text-4xl font-semibold text-white">Légende à venir</h3>
    </aside>
  );
};
