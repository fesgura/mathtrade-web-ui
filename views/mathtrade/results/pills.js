import Pill from "../stats/pills/pill";
import { Row, Col } from "reactstrap";

const Pills = ({ MathTradeData }) => {
  return MathTradeData ? (
    <div className="pill-stats pt-0 pb-5">
      <Row className="align-items-stretch">
        <Col md={4}>
          <Pill
            value={MathTradeData?.games || 0}
            label="results.pill.game"
            color="game"
          />
        </Col>
        <Col md={4}>
          <Pill
            value={MathTradeData?.items || 0}
            label="results.pill.item"
            color="item"
          />
        </Col>
        <Col md={4}>
          <Pill
            value={MathTradeData?.users?.length || 0}
            label="results.pill.user"
            color="user"
          />
        </Col>
      </Row>
    </div>
  ) : null;
};
export default Pills;
