import { useState, useEffect } from "react";
import ItemExtense from "components/itemExtense";
import WantEditor from "components/wantEditor";
import GroupTagHeader from "components/groupTagHeader";
import { Dragger } from "components/dragNdrop";
import storage from "utils/storage";

const MT_ItemListViewItem = ({
  item,
  afterAnyChange,
  wantList,
  tagList,
  dragToGroup,
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
            isOwner={isOwner}
          />
        </div>
      }
      variant="variant-0"
      withDragger={!isOwner}
      groupHeader={
        <GroupTagHeader
          item={item}
          groupOrTag="tag"
          groups={tagList}
          afterAnyChange={afterAnyChange}
        />
      }
    />
  );

  return isOwner ? (
    itemComp
  ) : (
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
    >
      {itemComp}
    </Dragger>
  );
};
export default MT_ItemListViewItem;
