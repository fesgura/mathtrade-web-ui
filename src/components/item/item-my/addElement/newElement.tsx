import ElementMyItem from "@/components/element/elementMyItem";

const NewElement = ({
  element,
  onCancel = undefined,
}: {
  element: any;
  onCancel?: () => void;
}) => {
  // An already-offered copy keeps its id (so saving moves it here instead of
  // offering it twice) and its condition, box size, comment and photos.
  const offered = element.mathElement;
  return (
    <ElementMyItem
      element={{
        id: offered?.id || null,
        element: {
          ...element,
          box_size: offered?.element?.box_size ?? element.box_size,
        },
        box_status: offered?.box_status || "",
        component_status: offered?.component_status || "",
        comment: offered?.comment || "",
        images: offered?.images || "",
      }}
      forAddElement
      onCancel={onCancel}
    />
  );
};
export default NewElement;
