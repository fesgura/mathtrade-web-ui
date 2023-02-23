import { useState, useEffect } from "react";
import Item from "components/item/full";
import WantEditor from "components/wantEditor";
import GroupTagHeader from "components/groupTagHeader";
import { Dragger } from "components/dragNdrop";
import storage from "utils/storage";
import Valuation from "components/valuation";

const MT_ItemListViewItem = ({
  item,
  afterAnyChange,
  wantList,
  tagList,
  dragToGroup,
  withDragger,
}) => {
  const [wantGroup, set_wantGroup] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

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

  useEffect(() => {
    const user = storage.getFromStore("user");
    setIsOwner(user?.id === item?.user?.id);
  }, [item]);

  const itemComp = (
    <Item
      item={item}
      high={wantGroup}
      highClassName={wantGroup ? "high-wanted" : null}
      afterAnyChange={afterAnyChange}
      btnRowListItem={[
        (k) => {
          return isOwner ? (
            <div key={k} className="item-full_own-item">
              Item propio
            </div>
          ) : null;
        },
        (k) => {
          return (
            <Valuation key={k} items={[item]} afterAnyChange={afterAnyChange} />
          );
        },
        (k) => {
          return (
            <WantEditor
              key={k}
              type="item"
              wantGroup={wantGroup}
              objectToWant={item}
              afterAnyChange={afterAnyChange}
              wantList={wantList}
              isOwner={isOwner}
            />
          );
        },
      ]}
      withDragger={!isOwner && withDragger}
      groupHeader={
        !isOwner ? (
          <GroupTagHeader
            item={item}
            groupOrTag="tag"
            groups={tagList}
            afterAnyChange={afterAnyChange}
          />
        ) : null
      }
    />
  );

  return (
    <Dragger
      key={`${item?.id}-${"item"}`}
      type="item_in_list"
      data={item}
      color={wantGroup ? "white" : "primary"}
      className={"dragger-for-item-extense"}
      onDrop={(item, dataGroup) => {
        if (dataGroup.tag.items.indexOf(item.id) < 0) {
          dragToGroup(dataGroup.tag, item);
        }
      }}
      title="Arrastrá y soltá el item sobre un grupo de la izquierda para agregar a un grupo."
      hidden={isOwner || !withDragger}
    >
      {itemComp}
    </Dragger>
  );
};
export default MT_ItemListViewItem;
