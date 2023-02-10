import { useId, useState, useEffect } from "react";
import {
  Col,
  Row,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Box from "components/box";
import Icon from "components/icon";
import classNames from "classnames";
import { dependencyToData } from "utils";
import I18N, { getI18Ntext } from "i18n";

const twoPointsReg = new RegExp(":", "g");

const BggGameBox = ({ element, className }) => {
  const id = useId("a").replace(twoPointsReg, "");

  const [stats, setStats] = useState({
    rate: 1,
    rateClass: 1,
    rateVotes: 1,
    weight: 1,
    weightVotes: 1,
  });
  const [dataDependency, setDataDependency] = useState({
    most: getI18Ntext("NoData"),
    list: [],
  });

  useEffect(() => {
    if (element) {
      setStats({
        rate: Math.round(element.rate * 10) / 10,
        rateClass: Math.floor(element.rate),
        rateVotes: parseInt(element.rate_votes, 10),
        weight: Math.round(element.weight * 100) / 100,
        weightVotes: parseInt(element.weight_votes, 10),
      });
      setDataDependency(
        dependencyToData({
          value: element.dependency,
          votes: element.dependency_votes,
        })
      );
    }
  }, [element]);

  return (
    <Box className={classNames("bgg-game-box", className)} color="bgg">
      <Row className="align-items-center">
        <Col xs="auto">
          <div className="bgg-game-box_col">
            <div className="bgg-game-box_rating">
              <div
                className={`bgg-game-box_rating-num bgg-rating-${stats.rateClass}`}
                id={`bgg-rank-${id}`}
              >
                {stats.rate}
              </div>
              <UncontrolledTooltip target={`bgg-rank-${id}`}>
                <div className="bgg-game-box_tooltip">
                  <b>
                    <I18N id="element.BGG.rating" />
                  </b>
                  <br />
                  {stats.rateVotes} ratings
                </div>
              </UncontrolledTooltip>
            </div>
          </div>
        </Col>
        <Col xs="auto">
          <div className="bgg-game-box_col">
            <div className="box_item" id={`bgg-dificultad-${id}`}>
              <div className="box_item-text text-normal">
                <b>{stats.weight}</b>/5
              </div>
              <div className="box_item-label">
                <I18N id="element.BGG.weight" />
              </div>
            </div>
            <UncontrolledTooltip target={`bgg-dificultad-${id}`}>
              <div className="bgg-game-box_tooltip">
                <b>
                  <I18N id="element.BGG.weight" />
                </b>
                <br />
                {stats.weightVotes} <I18N id="element.BGG.votes" />
              </div>
            </UncontrolledTooltip>
          </div>
        </Col>
        <Col xs="auto">
          <div className="bgg-game-box_col">
            <div className="box_item">
              <div className="box_item-text">
                <b>
                  <UncontrolledButtonDropdown size="sm">
                    <DropdownToggle
                      caret={dataDependency.list.length > 0}
                      className={classNames("bgg-game-box_dependency-btn", {
                        enabled: dataDependency.list.length > 0,
                      })}
                      tag="div"
                      title={getI18Ntext("element.BGG.VotesInBGG")}
                    >
                      {dataDependency.most}{" "}
                    </DropdownToggle>
                    {dataDependency.list.length ? (
                      <DropdownMenu>
                        {dataDependency.list.map((dep, k) => {
                          return (
                            <DropdownItem text key={k}>
                              <div className="bgg-game-box_dependency_list-item">
                                <Row className="align-items-center">
                                  <Col>{dep.text}</Col>
                                  <Col xs="auto">
                                    <b>{`(${dep.value} ${getI18Ntext(
                                      "element.BGG.vote"
                                    )}${dep.value === 1 ? "" : "s"})`}</b>
                                  </Col>
                                </Row>
                              </div>
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    ) : null}
                  </UncontrolledButtonDropdown>
                </b>
              </div>
              <div className="box_item-label">
                <I18N id="element.BGG.dependency" />
              </div>
            </div>
          </div>
        </Col>
        <Col xs="auto">
          <div className="bgg-game-box_col">
            <div className="box_item">
              <div className="box_item-text">
                <a
                  href={`https://boardgamegeek.com/boardgame/${element?.bgg_id}/`}
                  target="_blank"
                  className="bgg-link"
                  id={`bgg-link-${id}`}
                >
                  BGG <Icon type="external-link" />
                </a>
                <UncontrolledTooltip target={`bgg-link-${id}`}>
                  <div className="bgg-game-info_tooltip">
                    <I18N id="element.BGG.OpenInBGG" />
                  </div>
                </UncontrolledTooltip>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Box>
  );
};
export default BggGameBox;
