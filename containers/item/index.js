import { useEffect, useState } from "react";
import ItemView from "views/item";
import storage from "utils/storage";

const Item = ({
  IamInMathTrade,
  item = null,
  itemsInMathTradeList = [],
  afterAnyChange = () => {},
  forceOwn,
}) => {
  const [own, setOwn] = useState(forceOwn);
  const [itemMathTradeData, setItemMathTradeData] = useState(null);

  useEffect(() => {
    if (!forceOwn && item && item.user) {
      const data = storage.getFromStore("user");
      if (item.user.email === data.email) {
        setOwn(true);
      }
    }
  }, [item, forceOwn]);

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
      own={own}
    />
  );
};
export default Item;
