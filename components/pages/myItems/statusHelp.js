import StatusBadge from "components/statusBadge";
import { statusKeys } from "config";
import I18N from "i18n";
import { Col, Row } from "reactstrap";

const StatusHelp = () => {
  return (
    <div className="status-help">
      {statusKeys.map((st) => {
        return (
          <div className="status-help-row" key={st}>
            <Row className="flex-nowrap g-0 align-items-center">
              <Col xs="auto">
                <div className="status-help-badge">
                  <StatusBadge status={st} />
                </div>
              </Col>
              <Col>
                <div className="status-help-desc">
                  <I18N id={`statusType.desc.${st}`} />
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
};
export default StatusHelp;
