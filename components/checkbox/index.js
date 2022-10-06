import classNames from "classnames";
import Icon from "components/icon";

const Checkbox = ({ value, className, onClick, disabled }) => {
  return (
    <div className={classNames("checkbox-btn", className)}>
      <div
        className={classNames("checkbox-btn-square", {
          checked: value,
          disabled,
        })}
        onClick={() => {
          if (!disabled) onClick();
        }}
      >
        <Icon type="check" />
      </div>
    </div>
  );
};
export default Checkbox;
