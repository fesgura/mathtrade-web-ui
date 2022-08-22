import classNames from "classnames";
import Icon from "components/icon";

const Checkbox = ({ value, className, onClick }) => {
  return (
    <div className={classNames("checkbox-btn", className)}>
      <div
        className={classNames("checkbox-btn-square", { checked: value })}
        onClick={onClick}
      >
        <Icon type="check" />
      </div>
    </div>
  );
};
export default Checkbox;
