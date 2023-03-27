import I18N from "i18n";
import Pill from "./pill";
import { Row, Col } from "reactstrap";

const Pills = ({ stats }) => {
  return (
    <div className="pill-stats">
      <Row className="align-items-stretch">
        <Col md={4}>
          <Pill value={stats.game_count} label="stats.pill.game" color="game" />
        </Col>
        <Col md={4}>
          <Pill
            value={stats.item_trades}
            label="stats.pill.item"
            footer={
              <I18N
                id="stats.pill.item.footer"
                values={[
                  stats.item_count,
                  ((100 * stats.item_trades) / stats.item_count).toFixed(0),
                ]}
              />
            }
            color="item"
          />
        </Col>
        <Col md={4}>
          <Pill
            value={stats.user_trading}
            label="stats.pill.user"
            footer={
              <I18N
                id="stats.pill.user.footer"
                values={[
                  stats.user_count,
                  ((100 * stats.user_trading) / stats.user_count).toFixed(0),
                ]}
              />
            }
            color="user"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Pills;
