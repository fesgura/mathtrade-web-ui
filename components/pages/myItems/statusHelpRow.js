import classNames from "classnames";
import StatusBadge from "components/statusBadge";
import I18N from "i18n";
import { Col, Row } from "reactstrap";

const StatusHelpRow = ({ st, block }) => {
  return st && st !== "" ? (
    <div className={classNames("status-help-row", { "py-0": block })}>
      <Row
        className={classNames({
          "g-0 align-items-center flex-nowrap": !block,
        })}
      >
        <Col xs={block ? 12 : "auto"}>
          <div className="status-help-badge">
            <StatusBadge status={st} />
          </div>
        </Col>
        <Col>
          <div
            className={classNames("status-help-desc", {
              "ps-0": block,
              "pt-1": block,
            })}
          >
            <I18N id={`statusType.desc.${st}`} />
          </div>
        </Col>
      </Row>
    </div>
  ) : null;
};
export default StatusHelpRow;
