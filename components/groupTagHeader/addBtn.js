import { useId, useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import Icon from "components/icon";
import { UncontrolledTooltip, UncontrolledPopover, Button } from "reactstrap";
import GroupTag from "./tag";
import AddTag from "components/addTag";

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

  const [putTag] = useApi({
    promise: MathTradeService.putTag,
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
        {groupsLeft.length ? (
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

                      newTag.items.push(item.id);
                      putTag({
                        id: tag.id,
                        data: newTag,
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
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
        <AddTag
          item={item}
          onCancel={() => {
            setModalAddOpen(false);
          }}
          forNotOwnItems
          afterAnyChange={afterAnyChange}
        />
      ) : null}
    </>
  );
};
export default AddBtn;
