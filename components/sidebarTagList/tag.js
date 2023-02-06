import { useState, useEffect } from "react";
import { Dropper } from "components/dragNdrop";
import classNames from "classnames";
import Icon from "components/icon";
import AddTag from "components/addTag";
import { getTextColorByBackgroundColor } from "utils";
import WantEditor from "components/wantEditor";
import { Col, Row } from "reactstrap";

const Tag = ({ tag, wantList, filterByTag, afterAnyChange, current }) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [wantGroup, setWantGroup] = useState(null);

  useEffect(() => {
    if (tag.wanted) {
      const wantGroupArr = wantList.filter((w) => {
        return w.id === tag.wanted;
      });
      if (wantGroupArr[0]) {
        setWantGroup(wantGroupArr[0]);
      }
    }
  }, [tag, wantList]);

  return (
    <>
      <div
        className={classNames("sidebar-group-list_tag", {
          current,
        })}
      >
        <Dropper accept={tag.id >= 0 ? "item_in_list" : "none"} data={{ tag }}>
          <div
            className={classNames("sidebar-group-list_tag_inner for-tag", {
              wanted: wantGroup,
            })}
            style={{
              backgroundColor: tag?.color || "#999999",
              color: getTextColorByBackgroundColor(tag?.color || "#999999"),
            }}
          >
            <Row className="align-items-center g-0">
              <Col>
                <div
                  className={classNames("sidebar-group-list_tag_inner-lab", {
                    "d-block": tag.id < 0,
                  })}
                  onClick={() => {
                    filterByTag(tag.id);
                  }}
                >
                  {`${tag?.name || "Sin título"}`}{" "}
                  {tag.items ? `(${tag.items.length || 0})` : null}
                </div>
                {tag.id > 0 ? (
                  <span
                    className="sidebar-group-list_tag_edit"
                    title="Editar"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalEditOpen(true);
                    }}
                  >
                    <Icon type="pencil" />
                  </span>
                ) : null}
              </Col>
              {tag.id > 0 && tag.items.length ? (
                <Col xs="auto">
                  <div className="sidebar-group-list_tag_want-editor">
                    <WantEditor
                      objectToWant={tag}
                      type="tag"
                      wantGroup={wantGroup}
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
        <AddTag
          tag={tag}
          onCancel={() => {
            setModalEditOpen(false);
          }}
          afterAnyChange={afterAnyChange}
          filterByTag={filterByTag}
        />
      ) : null}
    </>
  );
};

export default Tag;
