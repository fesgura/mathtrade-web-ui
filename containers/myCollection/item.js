import { useEffect, useState } from "react";
import ItemView from "views/myCollection/item";

const ItemContainer = ({
  IamInMathTrade,
  item = null,
  itemsInMathTradeList = [],
  afterAnyChange = () => {},
  editItem,
  notShowAddItem,
  withDragger,
  notHighlated,
  showGroups,
  groups,
  canEditList,
  canEditWants,
}) => {
  const [itemMathTradeData, setItemMathTradeData] = useState(null);

  useEffect(() => {
    if (item && itemsInMathTradeList && itemsInMathTradeList.length) {
      const itemMathTradeDataArray = itemsInMathTradeList.filter((itm) => {
        return itm.id === item.id;
      });
      if (itemMathTradeDataArray[0]) {
        setItemMathTradeData(itemMathTradeDataArray[0]);
      }
    }
  }, [item, itemsInMathTradeList]);

  return (
    <ItemView
      IamInMathTrade={IamInMathTrade}
      item={item}
      itemMathTradeData={itemMathTradeData}
      afterAnyChange={afterAnyChange}
      editItem={editItem}
      notShowAddItem={notShowAddItem}
      withDragger={withDragger}
      notHighlated={notHighlated}
      showGroups={showGroups}
      groups={groups}
      canEditList={canEditList}
      canEditWants={canEditWants}
    />
  );
};
export default ItemContainer;
