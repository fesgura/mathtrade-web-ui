import classNames from "classnames";
import Icon from "components/icon";

const graphHeight = 42;

const Graph = ({
  selected,
  extraHeight = 0,
  extendedV,
  extendedH,
  onMouseDown,
  onMouseEnter,
}) => {
  return (
    <div
      className={classNames("mw_grid-box-check", {
        "extended-h": extendedH,
        selected,
      })}
      style={{
        height: `${(1 + (extendedV ? extraHeight : 0)) * graphHeight}px`,
      }}
      draggable="false"
    >
      <div className="mw_grid-box-check_wrap">
        <div
          className="mw_grid-box-check_content"
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
        >
          <div className="mw_grid-box-checkbox">
            <Icon type="check" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Graph;
