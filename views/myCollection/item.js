import ItemExtense from "components/itemExtense";
import PublishInMT from "./publish_in_mt";
import AddItem from "components/pages/myItems/addItem";
import GroupHeader from "components/groupHeader";

const Item = ({
  IamInMathTrade,
  item,
  itemMathTradeData,
  afterAnyChange,
  editItem,
  notShowAddItem,
  withDragger,
  notHighlated,
  showGroups,
  groups,
}) => {
  return (
    <ItemExtense
      item={item}
      high={notHighlated ? false : itemMathTradeData}
      rightHeader={
        IamInMathTrade ? (
          <PublishInMT
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
      withDragger={withDragger}
      groupHeader={
        showGroups ? (
          <GroupHeader
            item={item}
            groups={groups}
            afterAnyChange={afterAnyChange}
          />
        ) : null
      }
    />
  );
};

export default Item;
