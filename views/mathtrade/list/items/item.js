import Item from "components/item";
import MT_ToolItem_ItemMT from "components/item/mt_tools/item_mt";

const MT_ItemListViewItem = ({ item, afterAnyChange, itemWants }) => {
  return (
    <Item
      item={item}
      tools={
        <MT_ToolItem_ItemMT
          item={item}
          afterAnyChange={afterAnyChange}
          itemWants={itemWants}
        />
      }
    />
  );
};
export default MT_ItemListViewItem;
