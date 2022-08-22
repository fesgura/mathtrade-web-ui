import { useEffect, useState } from "react";
import ItemView from "views/my-items/item";
import storage from "utils/storage";

const ItemContainer = ({
  IamInMathTrade,
  item = null,
  itemsInMathTradeList = [],
  afterAnyChange = () => {},
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
    />
  );
};
export default ItemContainer;
