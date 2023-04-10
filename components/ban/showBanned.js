import classNames from "classnames";
import Icon from "components/icon";
import I18N from "i18n";
import { useEffect, useState } from "react";

const ShowBanned = ({ className, filters, setFilters, type }) => {
  const [isIgnored, setIsIgnored] = useState(false);

  useEffect(() => {
    if (filters && filters.query) {
      setIsIgnored(filters.query?.ignored || false);
    } else {
      setIsIgnored(false);
    }
  }, [filters]);

  return (
    <div className={classNames("btn-filter-showBans_container", className)}>
      <div
        className="btn-filter-showBans"
        onClick={() => {
          if (isIgnored) {
            setFilters({ ignored: undefined });
          } else {
            setFilters({ ignored: true });
          }
        }}
      >
        <Icon type="ban" className="ic-ban me-2" />
        <I18N id={`ban.btn-filter.${isIgnored ? "hide" : "show"}.${type}`} />
      </div>
    </div>
  );
};

export default ShowBanned;
