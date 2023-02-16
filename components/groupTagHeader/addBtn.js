import { useId, useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import Icon from "components/icon";
import { UncontrolledTooltip, Popover, Button } from "reactstrap";
import GroupTag from "./tag";
import AddTag from "components/addTag";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const AddBtn = ({ item, listAlreadyAdded, groups, afterAnyChange }) => {
  const id = useId("add-group").replace(twoPointsReg, "");
  const [modalAddOpen, setModalAddOpen] = useState(false);

  const [groupsLeft, setGroupsLeft] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((v) => {
      return !v;
    });
  };

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
      <button className="group-add-btn" id={id} onClick={toggleOpen}>
        <Icon type="plus" />
      </button>
      <UncontrolledTooltip target={id}>
        <I18N id="itemList.Tags.AddItemToTag" />
      </UncontrolledTooltip>
      <Popover
        className="group-header-popover"
        placement="bottom"
        flip
        isOpen={isOpen}
        target={id}
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
                      toggleOpen();
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
              toggleOpen();
              setModalAddOpen(true);
            }}
          >
            <I18N id="itemList.Tags.NewTag" />
          </Button>
        </div>
      </Popover>
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
