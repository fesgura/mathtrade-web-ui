import { useId, useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import Icon from "components/icon";
import { UncontrolledTooltip, UncontrolledPopover, Button } from "reactstrap";
import GroupTag from "./tag";
import AddGroup from "components/addGroup";

const twoPointsReg = new RegExp(":", "g");

const AddBtn = ({ item, listAlreadyAdded, groups, afterAnyChange }) => {
  const id = useId("add-group").replace(twoPointsReg, "");
  const [modalAddOpen, setModalAddOpen] = useState(false);

  const [groupsLeft, setGroupsLeft] = useState([]);

  useEffect(() => {
    const newGroupsLeft = groups.filter((g) => {
      const arr = listAlreadyAdded.filter((l) => {
        return l.id === g.id;
      });
      return arr.length === 0;
    });
    setGroupsLeft(newGroupsLeft);
  }, [listAlreadyAdded, groups]);
  //////////////////////////////////////////

  const [putMyItemGroup] = useApi({
    promise: MathTradeService.putMyItemGroups,
    afterLoad: () => {
      afterAnyChange();
    },
  });

  //////////////////////////////////////////

  return (
    <>
      <button className="group-add-btn" id={id}>
        <Icon type="plus" />
      </button>
      <UncontrolledTooltip target={id}>
        Agregar item a grupo
      </UncontrolledTooltip>
      <UncontrolledPopover
        className="group-header-popover"
        placement="bottom"
        target={id}
        trigger="focus"
        flip
      >
        <div className="group-header-pad">
          <div className="group-header-row centered">
            {groupsLeft.map((tag, k) => {
              return (
                <GroupTag
                  key={k}
                  tag={tag}
                  forAdd
                  onClick={() => {
                    const newTag = { ...tag };
                    const id = newTag.id;
                    const item_ids = [...newTag.item_ids];
                    delete newTag.id;
                    delete newTag.item_ids;

                    if (!item_ids.includes(item?.id)) {
                      item_ids.push(item?.id);
                      putMyItemGroup({
                        id,
                        data: {
                          ...newTag,
                          item_ids,
                        },
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
        <hr className="m-0 mb-2" />
        <div className="text-center pt-0 p-2">
          <Button
            size="xs"
            onClick={() => {
              setModalAddOpen(true);
            }}
          >
            Nuevo grupo
          </Button>
        </div>
      </UncontrolledPopover>
      {modalAddOpen ? (
        <AddGroup
          item={item}
          onCancel={() => {
            setModalAddOpen(false);
          }}
          afterAnyChange={afterAnyChange}
        />
      ) : null}
    </>
  );
};
export default AddBtn;
