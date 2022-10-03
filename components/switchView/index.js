import classNames from "classnames";
import Icon from "components/icon";

const SwitchView = ({ options = [], value = 0, onChange = () => {} }) => {
  return (
    <div className="switch-view">
      {options.map((op, k) => {
        const { icon, text } = op;
        return (
          <div
            className={classNames("switch-view_item", { current: value === k })}
            onClick={() => {
              onChange(k);
            }}
            key={k}
          >
            {icon ? <Icon type={icon} /> : null}
            {text ? text : null}
          </div>
        );
      })}
    </div>
  );
};
export default SwitchView;
