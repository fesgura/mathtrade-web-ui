import { useState } from "react";
import classNames from "classnames";
import I18N from "i18n";

const SidebarTabs = ({ tabs = [], onChange }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="sidebar-tabs">
      <div className="sidebar-tabs_header">
        {tabs.map((t, k) => {
          return (
            <div
              className={classNames("sidebar-tabs_header_tab", {
                current: current === k,
              })}
              key={k}
              onClick={() => {
                setCurrent(k);
                if (onChange) onChange(k);
              }}
            >
              <I18N id={t.title} />
            </div>
          );
        })}
      </div>
      <div className="sidebar-tabs_body">
        {tabs.map((t, k) => {
          return (
            <div
              className={classNames("sidebar-tabs_body_tab", {
                current: current === k,
              })}
              key={k}
            >
              {t.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SidebarTabs;
