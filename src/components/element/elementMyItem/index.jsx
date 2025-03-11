import ElementWrapperInside from "../elementCollection/elementWrapperInside";
import ElementCollection from "../elementCollection";
import ElementMyItemExtraData from "./extraData";

const ElementMyItem = ({ element, forAddElement, onCancel }) => {
  return (
    <ElementWrapperInside
      className={forAddElement ? "border-8 border-item-400" : null}
    >
      <ElementCollection
        element={element}
        insideItem
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
