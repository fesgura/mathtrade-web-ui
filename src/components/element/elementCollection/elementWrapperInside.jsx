import clsx from "clsx";
import { cardSurfaceClass } from "@/components/badgeType/cardKind";

const ElementWrapperInside = ({
  children,
  padded = true,
  // When the parent article already paints the outer border (Yo ofrezco
  // plain card), skip this one so the tint sits flush to that edge.
  bordered = true,
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg",
        cardSurfaceClass,
        {
          "border border-gray-400": bordered,
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
