"use client";
import clsx from "clsx";
import ElementWrapperInside from "../elementCollection/elementWrapperInside";
import ElementCollection from "../elementCollection";
import ElementMyItemExtraData from "./extraData";
import type { ReactNode } from "react";

const ElementMyItem = ({
  element = null,
  forAddElement = false,
  onCancel = undefined,
  header = null,
  // Yo ofrezco plain card: the article already draws the outer stroke, so
  // skip this border or the tint sits behind a double frame.
  bordered = true,
}: {
  element?: any;
  forAddElement?: boolean;
  onCancel?: () => void;
  header?: ReactNode;
  bordered?: boolean;
}) => {
  return (
    <ElementWrapperInside
      // Unpadded so ElementView's tint fills the card edge. The old
      // p-4 + ElementView -m-4 cancel was clipped by overflow-x-hidden
      // on cardSurfaceClass and left a white gutter inside the border.
      padded={false}
      bordered={forAddElement ? true : bordered}
      className={clsx(
        forAddElement ? "border-4 border-dashed border-want" : null
      )}
    >
      <ElementCollection
        element={element}
        insideItem
        header={header}
        layout="row"
        extraContent={
          <ElementMyItemExtraData
            forAddElement={forAddElement}
            onCancel={onCancel}
          />
        }
      />
    </ElementWrapperInside>
  );
};
export default ElementMyItem;
