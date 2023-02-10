import { useState, useEffect } from "react";
import { getTitleFromItem } from "utils";
import CardComp from "components/cardComp";
import UserBox from "components/userBox";
import Element from "./element";
import EditBtn from "./editBtn";
import classNames from "classnames";
import I18N from "i18n";

const ItemExtense = ({
  item,
  rightHeader,
  leftHeader,
  footer,
  high,
  showUser = true,
  onEdit,
  inModal,
  withDragger,
  groupHeader,
  variant = "variant-0",
}) => {
  const [title, setTitle] = useState("");
  const [isCombo, setIsCombo] = useState(false);

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

  return (
    <div className="item-extense">
      <CardComp
        title={
          <div className={classNames({ "with-dragger": withDragger })}>
            {isCombo ? (
              <>
                <u>
                  <I18N id="Combo" />
                </u>
                :{" "}
              </>
            ) : null}
            {title}
          </div>
        }
        variant={variant}
        rightHeader={rightHeader}
        leftHeader={
          leftHeader ? (
            leftHeader
          ) : onEdit && !isCombo ? (
            <EditBtn
              onEdit={() => {
                onEdit(item, item?.elements[0]);
              }}
            />
          ) : null
        }
        footer={footer}
        high={high}
        inModal={inModal}
        classNameBody={groupHeader ? "pt-0" : null}
      >
        {groupHeader}
        {item?.elements?.map((element, k) => {
          return (
            <Element
              item={item}
              element={element}
              titleTools={leftHeader}
              isCombo={isCombo}
              key={k}
              onEdit={onEdit}
            />
          );
        })}
        {showUser && <UserBox className="mb-0 mt-2" item={item} />}
      </CardComp>
    </div>
  );
};
export default ItemExtense;
