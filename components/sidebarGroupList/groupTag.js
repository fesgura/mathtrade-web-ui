import { useState } from "react";
import { Dropper } from "components/dragNdrop";
import classNames from "classnames";
import Icon from "components/icon";
import AddGroup from "components/addGroup";
import { getTextColorByBackgroundColor } from "utils";
import { getI18Ntext } from "i18n";
import { Col, Row } from "reactstrap";
import Valuation from "components/valuation";

const GroupTag = ({
  zIndex,
  group,
  groupIdSelected,
  setGroupIdSelected,
  count,
  afterAnyChange,
  canEditWants,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);

  return (
    <>
      <div
        className={classNames("sidebar-group-list_tag", {
          current: groupIdSelected === group.id,
          child: group.id >= 0,
        })}
        style={{
          zIndex: zIndex,
        }}
      >
        <Dropper accept="item" data={{ group_id: group.id }}>
          <div
            className="sidebar-group-list_tag_inner"
            style={{
              backgroundColor: group?.color || "#999999",
              color: getTextColorByBackgroundColor(group?.color || "#999999"),
            }}
          >
            <Row className="g-0 align-items-center flex-nowrap">
              <Col xs={8}>
                <div
                  className="sidebar-group-list_tag_inner_text break-word"
                  onClick={() => {
                    setGroupIdSelected(group.id);
                  }}
                >{`${group?.name || "Sin título"} (${count || 0})`}</div>
              </Col>

              {group.id && canEditWants > 0 ? (
                <Col xs="auto">
                  <span
                    className="sidebar-group-list_tag_edit"
                    title={getI18Ntext("myItems.sidebar.Edit")}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalEditOpen(true);
                    }}
                  >
                    <Icon type="pencil" />
                  </span>{" "}
                </Col>
              ) : null}

              {group.id > 0 ? (
                <Col>
                  <div className="sidebar-group-list_tag_tools">
                    <Valuation
                      items={group.items}
                      min
                      afterAnyChange={afterAnyChange}
                    />
                  </div>
                </Col>
              ) : null}
            </Row>
          </div>
        </Dropper>
      </div>
      {modalEditOpen ? (
        <AddGroup
          group={group}
          onCancel={() => {
            setModalEditOpen(false);
          }}
          afterAnyChange={afterAnyChange}
        />
      ) : null}
    </>
  );
};

export default GroupTag;
