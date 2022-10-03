import { useState, useEffect } from "react";
import classNames from "classnames";
import { Button } from "reactstrap";
import Icon from "components/icon";

const AddItem = ({ item, className, onClick }) => {
  const [elementNum, setElementNum] = useState(0);

  useEffect(() => {
    if (item && item.elements) {
      setElementNum(item.elements.length);
    }
  }, [item]);

  let btnTitle;

  switch (elementNum) {
    case 0:
      btnTitle = <b>Agregar nuevo Item</b>;
      break;
    case 1:
      btnTitle = (
        <>
          <b>Agregar</b> (para crear un <b>combo</b>)
        </>
      );
      break;
    default:
      btnTitle = (
        <>
          <b>Agregar</b> al <b>combo</b>
        </>
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
