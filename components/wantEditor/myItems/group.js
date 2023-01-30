import { useState, useEffect } from "react";
import Icon from "components/icon";
import { Collapse, Row, Col, Card } from "reactstrap";
import Checkbox from "components/checkbox";
import { getTextColorByBackgroundColor } from "utils";
import classNames from "classnames";
import Item from "./item";

const Group = ({ group, item_ids, setMyItemIds }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [groupSelected, setGroupSelected] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    let allSelected = true;

    group.items.forEach((item) => {
      const idExist = item_ids.filter((id) => {
        return item.id === id;
      }).length;

      if (!idExist) {
        allSelected = false;
      }
    });
    setGroupSelected(allSelected);
  }, [item_ids, group]);

  useEffect(() => {
    if (!isLoaded) {
      let allSelected = true;
      let someSelected = false;

      group.items.forEach((item) => {
        const idExist = item_ids.filter((id) => {
          return item.id === id;
        }).length;

        if (!idExist) {
          allSelected = false;
        }
        if (idExist) {
          someSelected = true;
        }
      });
      setIsLoaded(true);

      if (!allSelected && someSelected) {
        setIsOpen(true);
      }
    }
  }, [item_ids, group, isLoaded]);

  return (
    <div className="my-item-minimal-group-container">
      <div
        className={classNames("my-item-minimal-group-button", { isOpen })}
        style={{
          backgroundColor: group.color,
          color: getTextColorByBackgroundColor(group?.color || "#000"),
        }}
      >
        <Row className="align-items-center g-0">
          <Col xs="auto">
            <Checkbox
              value={groupSelected}
              onClick={() => {
                const list = group.items.map((item) => {
                  return item.id;
                });
                setMyItemIds(list, groupSelected ? "quit" : "add");
              }}
            />
          </Col>
          <Col className="px-3">
            <div
              className="my-item-minimal-group-button_inner"
              onClick={toggle}
            >
              <Icon
                type="chevron-right"
                className="my-item-minimal-group-button_arrow"
              />
              {group.name}
            </div>
          </Col>
        </Row>
      </div>

      <Collapse isOpen={isOpen}>
        <div className="my-item-minimal-group-collapse">
          {group.items.map((item) => {
            return (
              <Item
                item={item}
                item_ids={item_ids}
                setMyItemIds={setMyItemIds}
                key={item.id}
              />
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};
export default Group;
