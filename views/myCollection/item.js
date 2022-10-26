import ItemExtense from "components/itemExtense";
import MT_Tools from "components/MathtradeTools/my-items";
import AddItem from "components/pages/myItems/addItem";

const Item = ({
  IamInMathTrade,
  item,
  itemMathTradeData,
  afterAnyChange,
  editItem,
  notShowAddItem,
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
      footer={
        !notShowAddItem ? <AddItem item={item} onClick={editItem} /> : null
      }
      showUser={false}
    />
  );
};

export default Item;
