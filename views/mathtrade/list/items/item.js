import { useState, useEffect } from "react";
import Item from "components/item/full";
import WantEditor from "components/wantEditor";
import GroupTagHeader from "components/groupTagHeader";
import { Dragger } from "components/dragNdrop";
import storage from "utils/storage";
import Valuation from "components/valuation";
import ItemComment from "components/itemComments";

const MT_ItemListViewItem = ({
  canEditWants,
  item,
  afterAnyChange,
  tagList,
  dragToGroup,
  withDragger,
}) => {
  const [isOwner, setIsOwner] = useState(false);

  const [wantGroup, setWantGroup] = useState(null);
  const [renderElem, setRenderElem] = useState(true);

  useEffect(() => {
    const user = storage.getFromStore("user");
    setIsOwner(user?.id === item?.user?.id);
    //
    const newWantGroupArray = item.wanted.filter((wg) => {
      return wg.type === "item";
    });
    if (newWantGroupArray[0]) {
      setWantGroup(newWantGroupArray[0]);
    } else {
      setWantGroup(null);
    }

    //
    setRenderElem(false);
    let timer = setTimeout(() => {
      setRenderElem(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
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
              wantGroupId={wantGroup?.id || null}
              isItemInOtherGroup={item.wanted.length >= 1 && !wantGroup?.id}
              objectToWant={item}
              afterAnyChange={afterAnyChange}
              isOwner={isOwner}
              canEditWants={canEditWants}
            />
          );
        },
      ]}
      withDragger={!isOwner && withDragger && canEditWants}
      groupHeader={
        !isOwner ? (
          <GroupTagHeader
            item={item}
            groupOrTag="tag"
            groups={tagList}
            afterAnyChange={afterAnyChange}
            canEditWants={canEditWants}
          />
        ) : null
      }
      footer={<ItemComment item={item} />}
    />
  );

  return renderElem ? (
    <Dragger
      // key={`${item?.id}-${"item"}`}
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
      hidden={isOwner || !withDragger || !canEditWants}
    >
      {itemComp}
    </Dragger>
  ) : (
    <div style={{ height: 360 }} />
  );
};
export default MT_ItemListViewItem;
