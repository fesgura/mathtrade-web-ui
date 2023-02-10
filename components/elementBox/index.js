import { useId, useEffect, useState } from "react";
import classNames from "classnames";
import Box from "components/box";
import Icon from "components/icon";
import StatusBadge from "components/statusBadge";
import { Col, Row, Badge, UncontrolledTooltip } from "reactstrap";
import I18N, { getI18Ntext } from "i18n";

const twoPointsReg = new RegExp(":", "g");

const ElementBox = ({ element, className }) => {
  const id = useId("b").replace(twoPointsReg, "");

  const [langListText, setLangListText] = useState("");

  useEffect(() => {
    const newLangListText = element.language
      .split(",")
      .map((lang) => {
        return getI18Ntext(`language.${lang.trim()}`);
      })
      .join(", ");
    setLangListText(newLangListText);
  }, [element]);

  return (
    <Box className={classNames("element-box pb-0", className)} color="element">
      <Row className="align-items-center">
        <Col xs="auto" className="element-box_col">
          <div className="box_item">
            <div className="box_item-text">
              {`${element.publisher} (${element.year}) `}
              <a
                href={`https://boardgamegeek.com/boardgameversion/${element?.bgg_version_id}/`}
                target="_blank"
                className="bgg-link d-inline"
                id={`bgg-link-${id}`}
              >
                BGG <Icon type="external-link" />
              </a>
              <UncontrolledTooltip target={`bgg-link-${id}`}>
                <div className="bgg-game-info_tooltip">
                  <I18N id="element.BGG.ViewEditionBGG" />
                </div>
              </UncontrolledTooltip>
            </div>
            <div className="box_item-label">
              <I18N id="element.Edition" />
            </div>
          </div>
        </Col>
        <Col xs="auto" className="element-box_col">
          <div className="box_item">
            <div className="box_item-text">{langListText}</div>
            <div className="box_item-label">
              <I18N id="element.Language" />
            </div>
          </div>
        </Col>
        <Col xs="auto" className="element-box_col">
          <div className="box_item">
            <div className="box_item-text">
              <StatusBadge status={element.status} />
            </div>
            <div className="box_item-label">
              <I18N id="element.Status" />
            </div>
          </div>
        </Col>
        {element.comment !== "" ? (
          <Col xs={12} className="element-box_col">
            <div className="box_item">
              <div className="box_item-text">{element.comment}</div>
              <div className="box_item-label">
                <I18N id="element.Comment" />
              </div>
            </div>
          </Col>
        ) : null}
      </Row>
    </Box>
  );
};
export default ElementBox;
