import type { ReactNode } from "react";

const ElementWrapperOuter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white p-4 mb-6 rounded-lg shadow-md flex flex-col">
      {children}
    </div>
  );
};

export default ElementWrapperOuter;
