import ItemExtense from "components/itemExtense";
import MT_ToolItem_MyItem from "components/item/mt_tools/my_item";
import MT_Tools from "components/MathtradeTools/my-items";
import AddItem from "components/myItems_tools/addItem";

const Item = ({
  IamInMathTrade,
  item,
  itemMathTradeData,
  afterAnyChange,
  editItem,
}) => {
  return (
    <ItemExtense
      item={item}
      high={itemMathTradeData}
      rightHeader={
        IamInMathTrade ? (
          <MT_Tools
            item={item}
            itemMathTradeData={itemMathTradeData}
            afterAnyChange={afterAnyChange}
          />
        ) : null
      }
      onEdit={editItem}
      footer={<AddItem item={item} onClick={editItem} />}
    />
  );
};

export default Item;
