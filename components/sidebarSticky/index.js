import classNames from "classnames";
import Icon from "components/icon";
import { useState } from "react";

const SidebarSticky = ({ children }) => {
  const [mobileVisible, setMobileVisible] = useState(false);

  return (
    <div className="sidebar-sticky">
      <div className="sidebar-sticky_btn_container">
        <div
          className="sidebar-sticky_btn"
          onClick={() => {
            setMobileVisible((v) => !v);
          }}
        >
          <Icon type={mobileVisible ? "close" : "filter"} />
        </div>
      </div>
      <div className={classNames("sidebar-sticky_content", { mobileVisible })}>
        {children}
      </div>
    </div>
  );
};

export default SidebarSticky;
