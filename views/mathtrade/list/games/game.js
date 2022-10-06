import { useState, useEffect } from "react";
import GameQuadCard from "components/gameQuadCard";
import MT_tools from "components/MathtradeTools/game-list";
import { Col, Row } from "reactstrap";

const MT_GameListViewGame = ({ viewType, game, afterAnyChange, itemWants }) => {
  /*
  const [wantInfo, setWantInfo] = useState(null);

  useEffect(() => {
    const newWantInfoArr = itemWants.filter((itm) => {
      return itm.want.id === item.id;
    });
    if (newWantInfoArr.length) {
      const newWantInfo = newWantInfoArr[0].items.map((itm) => {
        return itm.id;
      });
      setWantInfo(newWantInfo);
    } else {
      setWantInfo(null);
    }
  }, [item, itemWants]);
*/
  return (
    <GameQuadCard
      game={game}
      //wanted={wantInfo !== null}
      wanted={false}
      footer={
        <Row className="justify-content-center">
          <Col xs="auto">
            <MT_tools
              game={game}
              afterAnyChange={afterAnyChange}
              // wantInfo={wantInfo}
            />
          </Col>
        </Row>
      }
    />
  );
};
export default MT_GameListViewGame;
