import ElementView from "views/element";
const Element = ({ element, itemId, forCombo }) => {
  return <ElementView element={element} forCombo={forCombo} />;
};
export default Element;
