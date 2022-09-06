import { Card, Row, Col } from "reactstrap";
import classNames from "classnames";
import Picture from "components/picture";

const Game = ({ game, tools, wanted }) => {
  return (
    <div className={classNames("game mb-4", { wanted, owner: game?.owner })}>
      <Row className="align-items-stretch g-0">
        <Col>
          <Card>
            <Row className="g-0 align-items-stretch">
              <Col sm={"auto"}>
                <div
                  className="game-thumbnail-container"
                  style={{ backgroundImage: `url("${game?.thumbnail}")` }}
                >
                  <Picture src={game?.thumbnail} />
                </div>
              </Col>
              <Col>I</Col>
            </Row>
          </Card>
        </Col>
        {tools ? <Col xs="auto">{tools}</Col> : null}
      </Row>
    </div>
  );
};

export default Game;
