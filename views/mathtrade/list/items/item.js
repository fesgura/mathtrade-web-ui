import { useState, useEffect } from "react";
import ItemExtense from "components/itemExtense";
import MT_tools from "components/MathtradeTools/item-list";
import GroupTagHeader from "components/groupTagHeader";

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
    <ItemExtense
      item={item}
      high={wantInfo !== null}
      rightHeader={
        <MT_tools
          item={item}
          afterAnyChange={afterAnyChange}
          wantInfo={wantInfo}
        />
      }
      withDragger
      groupHeader={
        <GroupTagHeader
          item={item}
          groups={[]}
          afterAnyChange={afterAnyChange}
        />
      }
    />
  );
};
export default MT_ItemListViewItem;
