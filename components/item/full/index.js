import { useState, useEffect } from "react";
import { getTitleFromItem } from "utils";
import I18N from "i18n";
import Element from "./element";
import BanButton from "components/ban/banButton";
import classNames from "classnames";
import { Col, Row } from "reactstrap";
import UserBox from "components/userBox";

// const btnRow = (

// );

const ItemFull = ({
  item,
  footer,
  btnRowListItem,
  btnRowListElement,
  className,
  highClassName,
  groupHeader,
  withDragger,
  showUser = true,
  forGame,
  inModal,
  afterAnyChange,
  notBan,
  onDeleteButton,
}) => {
  const [title, setTitle] = useState("");
  const [isCombo, setIsCombo] = useState(false);
  const [btnRowListforItem, setBtnRowListforItem] = useState([]);
  const [btnRowListforElement, setBtnRowListforElement] = useState([]);

  useEffect(() => {
    if (item) {
      setIsCombo((item?.elements?.length || 1) > 1);

      let newTitle = "";
      item?.elements?.forEach((element) => {
        newTitle += " + " + element?.name;
      });

      setTitle(getTitleFromItem(item));
    }
  }, [item]);

  useEffect(() => {
    if ((item?.elements?.length || 1) > 1) {
      //const newbtnRowListItem = btnRowListItem.concat([]);
      setBtnRowListforItem(btnRowListItem ? btnRowListItem : []);
      setBtnRowListforElement(btnRowListElement ? btnRowListElement : []);
    } else {
      setBtnRowListforItem([
        ...(btnRowListElement || []),
        ...(btnRowListItem || []),
      ]);
      setBtnRowListforElement([]);
    }
  }, [item, btnRowListItem, btnRowListElement]);

  return (
    <div
      className={classNames("item-full", highClassName, className, {
        "with-btn-row-v": btnRowListforItem.length,
        "with-btn-row-h":
          btnRowListforItem.length || btnRowListforElement.length,
      })}
    >
      <div className={classNames("item-full-card", { "in-modal": inModal })}>
        {!forGame && isCombo ? (
          <div
            className={classNames("item-full-title", {
              "with-btns": btnRowListforItem.length,
            })}
          >
            <Row className="g-0 flex-nowrap">
              <Col xs="auto">
                <div
                  className={classNames("dragger-spacer", {
                    show: withDragger,
                  })}
                />
              </Col>
              <Col>
                <b>
                  <I18N id="Combo" />:
                </b>{" "}
                <span className="item-full-title_name">{title}</span>
                {notBan ? null : (
                  <BanButton
                    label="ban.Item"
                    element={item}
                    type="item"
                    afterAnyChange={afterAnyChange}
                  />
                )}
                {groupHeader}
              </Col>
            </Row>
          </div>
        ) : null}

        {item?.elements?.map((element, k) => {
          if (forGame) {
            if (element.bgg_id !== forGame) {
              return null;
            }
          }
          return (
            <Element
              item={item}
              element={element}
              // titleTools={leftHeader}
              isCombo={!forGame && isCombo}
              key={k}
              btnRowListElement={btnRowListforElement}
              groupHeader={groupHeader}
              withDragger={withDragger}
              showUser={showUser}
              forGame={forGame}
              afterAnyChange={afterAnyChange}
              notBan={notBan}
              onDeleteButton={onDeleteButton}
            />
          );
        })}
        {!forGame && isCombo && showUser ? (
          <div className="item-full-user">
            <UserBox
              item={item}
              afterAnyChange={afterAnyChange}
              notBan={notBan}
            />
          </div>
        ) : null}
        {footer ? <div className="item-full-footer">{footer}</div> : null}
        {btnRowListforItem.length ? (
          <div className="item-full-btn-row">
            {btnRowListforItem.map((btn, k) => {
              return btn(k, item, item.elements[0]);
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default ItemFull;
