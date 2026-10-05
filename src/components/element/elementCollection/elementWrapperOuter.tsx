import type { ReactNode } from "react";

const ElementWrapperOuter = ({
  children,
  tourAnchor,
}: {
  children: ReactNode;
  tourAnchor?: string; // data-tour for the guided tutorial (src/tours)
}) => {
  return (
    <div
      // min-w-0 max-w-full w-full for card bounds, but no overflow-x-hidden:
      // ElementView uses -m-4 to cancel p-4 so the tint reaches this edge;
      // clipping that bleed reintroduces a white gutter (same bug as my-offer).
      className="bg-white p-4 mb-6 rounded-lg shadow-md flex flex-col min-w-0 max-w-full w-full"
      data-tour={tourAnchor}
    >
      {children}
    </div>
  );
};

export default ElementWrapperOuter;
