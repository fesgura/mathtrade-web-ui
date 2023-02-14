import { useId, useState, useEffect } from "react";
import classNames from "classnames";
import { Col, Row, DropdownItem, UncontrolledTooltip } from "reactstrap";
import Thumbnail from "components/thumbnail";
import Icon from "components/icon";
import Pill from "components/pillData";
import StatusBadge from "components/statusBadge";
import { dependencyToData } from "utils";
import I18N, { getI18Ntext } from "i18n";
import UserBox from "components/userBox";

const twoPointsReg = new RegExp(":", "g");

const Element = ({
  item,
  element,
  isCombo,
  btnRowListElement,
  groupHeader,
  withDragger,
  showUser,
  forGame,
}) => {
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
  const [langListText, setLangListText] = useState("");

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
      const newLangListText = element.language
        .split(",")
        .map((lang) => {
          return getI18Ntext(`language.${lang.trim()}`);
        })
        .join(", ");
      setLangListText(newLangListText);
    }
  }, [element]);

  return (
    <div className={classNames("element-full", { isCombo })}>
      <Row className="g-0 flex-nowrap">
        <Col xs="auto">
          <div
            className={classNames("dragger-spacer", {
              show: withDragger,
            })}
          />
        </Col>
        <Col xs="auto">
          <div className="element-full-thumbnail">
            <Thumbnail src={element?.thumbnail || ""} />
          </div>
        </Col>
        <Col>
          <div className="element-full-data">
            {/* <BggGameBox element={element} />*/}
            {/* <ElementBox element={element} /> */}
            <div className="element-full-title">
              <a
                href={`https://boardgamegeek.com/boardgame/${element?.bgg_id}/`}
                target="_blank"
                className="element-full-title bgg-link"
                id={`bgg-game-link-${id}`}
              >
                {element?.name}
                <Icon type="external-link" />
              </a>
              {!isCombo && groupHeader}
              <UncontrolledTooltip target={`bgg-game-link-${id}`}>
                <div className="bgg-game-info_tooltip">
                  <I18N id="element.BGG.OpenGameInBGG" />
                </div>
              </UncontrolledTooltip>
            </div>
            <div className="element-full-pills">
              <Row className="g-0">
                <Col xs="auto">
                  <Pill
                    label="element.BGG.rating"
                    text={
                      <b
                        className={`bgg-rating-num bgg-rating-num-${stats.rateClass}`}
                      >
                        {stats.rate}
                      </b>
                    }
                    question={`${stats.rateVotes} ${getI18Ntext(
                      "element.BGG.votes"
                    )}`}
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
                    question={`${stats.weightVotes} ${getI18Ntext(
                      "element.BGG.votes"
                    )}`}
                    noTranslateQuestion
                  />
                </Col>
                {forGame ? null : (
                  <Col xs="auto">
                    {" "}
                    <Pill
                      label="element.Edition"
                      text={
                        element?.bgg_version_id === "other" ? (
                          `${element.publisher} (${element.year})`
                        ) : (
                          <>
                            <a
                              href={`https://boardgamegeek.com/boardgameversion/${element?.bgg_version_id}/`}
                              target="_blank"
                              className="bgg-link d-inline"
                              id={`bgg-link-${id}`}
                            >
                              {`${element.publisher} (${element.year}) `}
                              <Icon type="external-link" />
                            </a>
                            <UncontrolledTooltip target={`bgg-link-${id}`}>
                              <div className="bgg-game-info_tooltip">
                                <I18N id="element.BGG.OpenEditionInBGG" />
                              </div>
                            </UncontrolledTooltip>
                          </>
                        )
                      }
                    />
                  </Col>
                )}
              </Row>

              <Row>
                {forGame ? null : (
                  <Col xs="auto">
                    <Pill label="element.Language" text={langListText} />
                  </Col>
                )}
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
                {forGame ? null : (
                  <Col xs="auto">
                    <Pill
                      label="element.Status"
                      text={<StatusBadge status={element.status} />}
                    />
                  </Col>
                )}
                {!forGame && element.comment !== "" ? (
                  <Col xs="12">
                    <Pill
                      label="element.Comment"
                      text={element.comment}
                      fullWidth
                    />
                  </Col>
                ) : null}
              </Row>
            </div>
            {!forGame && !isCombo && showUser ? (
              <div className="element-full-user">
                <UserBox item={item} />
              </div>
            ) : null}
          </div>
        </Col>
      </Row>

      {btnRowListElement.length ? (
        <div className="element-full-btn-row">
          {btnRowListElement.map((btn) => {
            return btn(item, element);
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Element;
