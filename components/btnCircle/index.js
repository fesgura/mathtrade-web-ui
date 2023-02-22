import classNames from "classnames";
import { useId } from "react";
import {
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { getI18Ntext } from "i18n";

const twoPointsReg = new RegExp(":", "g");

const BtnCircle = ({
  idBtn,
  className,
  children,
  onClick = () => {},
  label = "",
  noTranslateLabel,
  min,
}) => {
  const id = useId("b").replace(twoPointsReg, "");
  return (
    <>
      <button
        className={classNames("btn btn_circle", className, {
          btn_circle_min: min,
        })}
        id={idBtn || `tt-btn-circle-q-${id}`}
        onClick={onClick}
      >
        {children}
      </button>
      <UncontrolledTooltip
        //placement="right"
        target={idBtn || `tt-btn-circle-q-${id}`}
      >
        {noTranslateLabel ? label : getI18Ntext(label)}
      </UncontrolledTooltip>
    </>
  );
};
export default BtnCircle;
