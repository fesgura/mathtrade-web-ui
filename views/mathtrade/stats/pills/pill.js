import classNames from "classnames";
import I18N from "i18n";

const Pill = ({ value, label, footer, color }) => {
  return (
    <div className={classNames("pill-stats_item", color)}>
      <div className="pill-stats_item-content">
        <div className="pill-stats_item-content-value">{value}</div>
        <div className="pill-stats_item-content-label">
          <I18N id={label} />
        </div>
        {footer ? (
          <div className="pill-stats_item-content-footer">{footer}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Pill;
