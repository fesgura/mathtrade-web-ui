import ItemXL from "@/components/item/item-grid/item-grid-ui/xl";

const ItemUI = () => {
  return (
    <div className="bg-item-200 rounded-md border border-item-300 shadow-xl w-full">
      <ItemXL hideWant hideTags />
    </div>
  );
};

export default ItemUI;
