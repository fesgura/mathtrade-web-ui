import { useState, useEffect } from "react";
import { Dropper } from "components/dragNdrop";
import classNames from "classnames";
import Icon from "components/icon";
import AddTag from "components/addTag";
import { getTextColorByBackgroundColor } from "utils";
import WantEditor from "components/wantEditor";
import Valuation from "components/valuation";
import { Col, Row } from "reactstrap";
import { getI18Ntext } from "i18n";

const Tag = ({
  tag,
  zIndex,
  wantList,
  filterByTag,
  afterAnyChange,
  current,
  canEditWants,
}) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [wantGroup, setWantGroup] = useState(null);
  const [itemsForValuation, setItemsForValuation] = useState([]);

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

  useEffect(() => {
    if (tag && tag.items) {
      const valueTag = tag?.value || 0;
      const newitemsForValuation = tag.items.map((itmId) => {
        return { id: itmId, value: valueTag };
      });
      setItemsForValuation(newitemsForValuation);
    }
  }, [tag]);

  return (
    <>
      <div
        className={classNames("sidebar-group-list_tag", {
          current,
        })}
        style={{
          zIndex: zIndex,
        }}
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
              <Col xs={8}>
                <div
                  className={classNames(
                    "sidebar-group-list_tag_inner_text  break-word",
                    {
                      "d-block": tag.id < 0,
                    }
                  )}
                  onClick={() => {
                    filterByTag(tag.id);
                  }}
                >
                  {`${tag?.name || "Sin título"}`}{" "}
                  {tag.items ? `(${tag.items.length || 0})` : null}
                </div>
              </Col>
              <Col xs="auto">
                {tag.id > 0 && canEditWants ? (
                  <span
                    className="sidebar-group-list_tag_edit"
                    title={getI18Ntext("itemList.Tags.Edit")}
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
                <Col>
                  <div className="sidebar-group-list_tag_tools">
                    <Valuation
                      items={itemsForValuation}
                      min
                      afterAnyChange={afterAnyChange}
                    />
                    <WantEditor
                      objectToWant={tag}
                      type="tag"
                      wantGroup={wantGroup}
                      afterAnyChange={afterAnyChange}
                      min
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
