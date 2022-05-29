export const MapButtonWrapper = ({ children }: { children: any }) => {
  return (
    <div className="w-full flex flex-col items-end justify-end p-2 overflow-hidden fixed z-overmap gap-2">
      {children}
    </div>
  );
};
