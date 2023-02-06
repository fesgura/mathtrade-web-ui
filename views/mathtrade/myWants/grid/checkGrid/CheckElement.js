import classNames from "classnames";
import Checkbox from "components/checkbox";

const CheckElement = ({
  myItemElement,
  myItem,
  wantElement,
  wantItem,
  isInnerMyItemElement,
  isInnerWantElement,
}) => {
  return (
    <div
      className={classNames("mywants-grid_check-element", {
        "extended-w": true,
        "extended-h": true,
      })}
    >
      <div className="mywants-grid_check-element-cont">
        <Checkbox onClick={() => {}} disabled={isInnerWantElement} />
      </div>
    </div>
  );
};
export default CheckElement;
