import { useId } from "react";
import classNames from "classnames";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import Thumbnail from "components/thumbnail";
import Icon from "components/icon";
import Pill from "components/pillData";
import StatusBadge from "components/statusBadge";
import { getLanguageListText } from "utils";
import I18N from "i18n";
import UserBox from "components/userBox";
import PillsBGG from "./pillsBGG";

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
              <PillsBGG element={element} />

              {forGame ? null : (
                <Row>
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

                  <Col xs="auto">
                    <Pill
                      label="element.Language"
                      text={getLanguageListText(element.language)}
                    />
                  </Col>

                  <Col xs="auto">
                    <Pill
                      label="element.Status"
                      text={<StatusBadge status={element.status} />}
                    />
                  </Col>

                  {element.comment !== "" ? (
                    <Col xs="12">
                      <Pill
                        label="element.Comment"
                        text={element.comment}
                        fullWidth
                      />
                    </Col>
                  ) : null}
                </Row>
              )}
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
          {btnRowListElement.map((btn, k) => {
            return btn(k, item, element);
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Element;
