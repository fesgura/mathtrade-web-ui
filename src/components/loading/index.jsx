import clsx from "clsx";
import HandSVG from "./handSVG";

const _ = [1, 2, 3, 4];

const LoadingGraph = ({ min }) => {
  return (
    <div className={clsx("loading-graph", { min })}>
      <div className="loading-graph_inner">
        {_.map((num) => {
          return (
            <div className={`loading-g loading-g-${num}`} key={num}>
              <div className="loading-g-in">
                <div className="ball">
                  <div className="ball-inner" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {_.map((num) => {
        return (
          <div className={`hand hand-${num}`} key={num}>
            <HandSVG />
          </div>
        );
      })}
    </div>
  );
};

export const LoadingBox = ({
  loading,
  className,
  transparent,
  min,
  center,
  zIndex,
}) => {
  return loading ? (
    <div
      className={clsx("loading-box", className, { transparent, min, center })}
      style={zIndex ? { zIndex } : null}
    >
      <LoadingGraph min={min} />
    </div>
  ) : null;
};
