import clsx from "clsx";
import { cardSurfaceClass } from "@/components/badgeType/cardKind";

const ElementWrapperInside = ({ children, padded = true, className = "" }) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg border border-gray-400",
        cardSurfaceClass,
        {
          "p-4": padded,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default ElementWrapperInside;
