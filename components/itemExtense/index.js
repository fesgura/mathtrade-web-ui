import { useId, useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
import CardComp from "components/cardComp";
import UserBox from "components/userBox";
import Element from "./element";
import Icon from "components/icon";
import EditBtn from "./editBtn";

const ItemExtense = ({
  item,
  rightHeader,
  leftHeader,
  footer,
  high,
  showUser = true,
  onEdit,
}) => {
  const [title, setTitle] = useState("");
  const [isCombo, setIsCombo] = useState(false);

  useEffect(() => {
    setIsCombo((item?.elements?.length || 1) > 1);

    let newTitle = "";
    item?.elements?.forEach((element) => {
      newTitle += " + " + element?.name;
    });

    setTitle(newTitle.substring(3));
  }, [item]);

  return (
    <div className="item-extense">
      <CardComp
        title={
          <>
            {isCombo ? (
              <>
                <u>Combo</u>:{" "}
              </>
            ) : null}
            {title}
          </>
        }
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
      >
        {item?.elements.map((element, k) => {
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
