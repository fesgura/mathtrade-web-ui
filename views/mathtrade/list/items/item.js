import Item from "components/item";
import MT_ToolItem_ItemMT from "components/item/mt_tools/item_mt";

const MT_ItemListViewItem = ({ item, afterAnyChange }) => {
  return (
    <Item
      item={item}
      tools={<MT_ToolItem_ItemMT item={item} afterAnyChange={afterAnyChange} />}
    />
  );
};
export default MT_ItemListViewItem;
