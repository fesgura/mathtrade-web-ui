import classNames from "classnames";
import Icon from "components/icon";
import { useEffect, useState } from "react";

const graphHeight = 42;

const Graph = ({
  selected,
  extraHeight = 0,
  extendedV,
  extendedH,
  onMouseDown,
  onMouseEnter,
  color,
  isInner,
}) => {
  const [style, setStyle] = useState(null);

  useEffect(() => {
    if (color) {
      setStyle({
        backgroundColor: `${color}${isInner ? 20 : 40}`,
      });
    }
  }, [color, isInner]);

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
          // onMouseDown={onMouseDown}
          // onMouseEnter={onMouseEnter}
          style={style}
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
