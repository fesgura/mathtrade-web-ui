import { useState, useEffect } from "react";
import classNames from "classnames";
import { Button } from "reactstrap";
import Icon from "components/icon";
import I18N from "i18n";

const AddItem = ({ item, className, onClick, canEditList }) => {
  const [elementNum, setElementNum] = useState(0);

  useEffect(() => {
    if (item && item.elements) {
      setElementNum(item.elements.length);
    }
  }, [item]);

  let btnTitle;

  switch (elementNum) {
    case 0:
      btnTitle = (
        <I18N
          id={`btn.MyCollection.addNewItem${canEditList ? "" : "CantEdit"}`}
        />
      );
      break;
    case 1:
      btnTitle = (
        <I18N
          id={`btn.MyCollection.addNewItemForCombo${
            canEditList ? "" : "CantEdit"
          }`}
        />
      );
      break;
    default:
      btnTitle = (
        <I18N
          id={`btn.MyCollection.addNewItemToCombo${
            canEditList ? "" : "CantEdit"
          }`}
        />
      );
  }

  return (
    <div className={classNames("element-create_step-0", className)}>
      <Button
        color="add-min"
        size="sm"
        //outline
        onClick={() => {
          if (onClick) onClick(item, null);
        }}
      >
        <Icon type="plus" className="me-1" />
        {btnTitle}
      </Button>
    </div>
  );
};
export default AddItem;
