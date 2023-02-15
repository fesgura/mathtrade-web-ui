import { useState, useEffect } from "react";
import { Col, Row, DropdownItem } from "reactstrap";
import Pill from "components/pillData";
import { getStatsOfElement } from "utils";
import { getI18Ntext } from "i18n";

const PillsBGG = ({ element }) => {
  const [stats, setStats] = useState(getStatsOfElement(null).stats);
  const [dataDependency, setDataDependency] = useState(
    getStatsOfElement(null).dataDependency
  );

  useEffect(() => {
    if (element) {
      const o = getStatsOfElement(element);
      setStats(o.stats);
      setDataDependency(o.dataDependency);
    }
  }, [element]);

  return (
    <Row className="g-0">
      <Col xs="auto">
        <Pill
          label="element.BGG.rating"
          text={
            <b className={`bgg-rating-num bgg-rating-num-${stats.rateClass}`}>
              {stats.rate}
            </b>
          }
          question={`${stats.rateVotes} ${getI18Ntext("element.BGG.votes")}`}
          noTranslateQuestion
        />
      </Col>
      <Col xs="auto">
        <Pill
          label="element.BGG.weight"
          text={
            <>
              <b>{stats.weight}</b>/5
            </>
          }
          question={`${stats.weightVotes} ${getI18Ntext("element.BGG.votes")}`}
          noTranslateQuestion
        />
      </Col>
      <Col xs="auto">
        <Pill
          label="element.BGG.dependency"
          text={dataDependency.most}
          question={
            <>
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
            </>
          }
          noTranslateQuestion
          dropdown
        />
      </Col>
    </Row>
  );
};

export default PillsBGG;
