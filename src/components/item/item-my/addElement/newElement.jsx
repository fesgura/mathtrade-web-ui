import ElementMyItem from "@/components/element/elementMyItem";

const NewElement = ({ element, onCancel }) => {
  return (
    <ElementMyItem
      element={{
        element,
        box_status: "",
        component_status: "",
        comment: "",
        images: "",
      }}
      forAddElement
      onCancel={onCancel}
    />
  );
};
export default NewElement;
