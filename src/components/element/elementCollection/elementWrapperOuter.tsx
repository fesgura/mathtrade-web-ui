import type { ReactNode } from "react";
import { cardSurfaceClass } from "@/components/badgeType/cardKind";

const ElementWrapperOuter = ({
  children,
  tourAnchor,
}: {
  children: ReactNode;
  tourAnchor?: string; // data-tour for the guided tutorial (src/tours)
}) => {
  return (
    <div
      className={`bg-white p-4 mb-6 rounded-lg shadow-md flex flex-col ${cardSurfaceClass}`}
      data-tour={tourAnchor}
    >
      {children}
    </div>
  );
};

export default ElementWrapperOuter;
