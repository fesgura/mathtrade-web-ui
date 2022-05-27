import { useState, useEffect } from "react";

import classNames from "classnames";

const Loading = () => {
  return (
    <div className="loading-graph">
      <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
    </div>
  );
};

export const LoadingBox = () => {
  return (
    <div className="loading-box">
      <div className="loading-box-container">
        <div className="loading-box-graph">
          <Loading />
        </div>
      </div>
    </div>
  );
};

export const LoadingPage = ({ loading }) => {
  const [status, set_status] = useState("");

  useEffect(() => {
    let timer = null;
    let timer2 = null;
    if (loading) {
      set_status("visible");
    } else {
      set_status("visible complete");
      timer = setTimeout(() => {
        set_status("visible complete hidden");
      }, 500);
      timer2 = setTimeout(() => {
        set_status("");
      }, 800);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [loading]);

  return (
    <div className={classNames("loading-page", status)}>
      <div className="loading-page_inner" />
    </div>
  );
};

export default Loading;
