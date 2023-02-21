import classNames from "classnames";
import { useEffect, useState } from "react";

const LoadingPad = ({ loading }) => {
  const [iconStatus, setIconStatus] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer = null;
    if (loading) {
      setVisible(true);
      setIconStatus("loading");
    } else {
      if (iconStatus === "loading") {
        setIconStatus("check");
        timer = setTimeout(() => {
          setVisible(false);
        }, 1200);
      }
    }
    return () => {
      //  clearTimeout(timer);
    };
  }, [loading, iconStatus]);

  return (
    <div className={classNames("loading-pad", { visible })}>
      {iconStatus === "check" ? (
        <div className="loading-pad_inner">
          <i className="fa fa-check" />
        </div>
      ) : (
        <div className="loading-pad_inner">
          <i className="fa fa-refresh fa-spin" />
        </div>
      )}
    </div>
  );
};
export default LoadingPad;
