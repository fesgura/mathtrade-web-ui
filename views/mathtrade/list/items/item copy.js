import { useState, useEffect } from "react";
import Item from "components/item";
import MT_ToolItem_ItemMT from "components/item/mt_tools/item_mt";

const MT_ItemListViewItem = ({ item, afterAnyChange, itemWants }) => {
  const [wantInfo, setWantInfo] = useState(null);

  useEffect(() => {
    const newWantInfoArr = itemWants.filter((itm) => {
      return itm.want.id === item.id;
    });
    if (newWantInfoArr.length) {
      const newWantInfo = newWantInfoArr[0].items.map((itm) => {
        return itm.id;
      });
      setWantInfo(newWantInfo);
    } else {
      setWantInfo(null);
    }
  }, [item, itemWants]);

  return (
    <Item
      item={item}
      wanted={wantInfo !== null}
      tools={
        <MT_ToolItem_ItemMT
          item={item}
          afterAnyChange={afterAnyChange}
          wantInfo={wantInfo}
        />
      }
    />
  );
};
export default MT_ItemListViewItem;
