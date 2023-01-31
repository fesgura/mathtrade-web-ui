import { useState, useEffect } from "react";
import ItemExtense from "components/itemExtense";
import WantEditor from "components/wantEditor";
import GroupTagHeader from "components/groupTagHeader";

const MT_ItemListViewItem = ({ item, afterAnyChange, wantList }) => {
  const [wantGroup, set_wantGroup] = useState(null);

  useEffect(() => {
    if (item && wantList.length) {
      const wantListFiltered = wantList.filter((w) => {
        const { bgg_id, want_ids } = w;
        if (bgg_id && bgg_id.length) {
          return false;
        }
        return want_ids.length === 1 && want_ids[0] === item.id;
      });
      if (wantListFiltered[0]) {
        set_wantGroup(wantListFiltered[0]);
      }
    }
  }, [item, wantList]);

  return (
    <ItemExtense
      item={item}
      high={wantGroup}
      rightHeader={
        <div>
          <WantEditor
            type="item"
            wantGroup={wantGroup}
            objectToWant={item}
            afterAnyChange={afterAnyChange}
            wantList={wantList}
          />
        </div>
      }
      variant="variant-0"
      // withDragger
      // groupHeader={
      //   <GroupTagHeader
      //     item={item}
      //     groups={[]}
      //     afterAnyChange={afterAnyChange}
      //   />
      // }
    />
  );
};
export default MT_ItemListViewItem;
