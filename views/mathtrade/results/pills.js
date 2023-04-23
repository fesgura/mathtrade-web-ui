import Pill from "../stats/pills/pill";
import { Row, Col } from "reactstrap";
import I18N from "i18n";
import { useMemo } from "react";

const Pills = ({ MathTradeData, users }) => {
  const userParticipants = useMemo(() => {
    if (!users) {
      return { count: 0, percent: 0 };
    }
    const count = users.filter((user) => user.commitment).length;
    return { count, percent: ((100 * count) / users.length).toFixed(0) };
  }, [users]);

  return MathTradeData ? (
    <div className="pill-stats pt-0 pb-5">
      <Row className="align-items-stretch">
        <Col md={3}>
          <Pill
            value={MathTradeData?.games || 0}
            label="results.pill.game"
            color="game"
          />
        </Col>
        <Col md={3}>
          <Pill
            value={MathTradeData?.items || 0}
            label="results.pill.item"
            color="item"
          />
        </Col>
        <Col md={6}>
          <Pill
            value={userParticipants.count}
            label="results.pill.user.commit"
            color="participants"
            footer={
              <I18N
                id="stats.pill.user.footer"
                values={[
                  MathTradeData?.users?.length || 0,
                  userParticipants.percent,
                ]}
              />
            }
          />
        </Col>
      </Row>
    </div>
  ) : null;
};
export default Pills;
