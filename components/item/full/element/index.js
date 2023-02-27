import { useEffect, useId, useState } from "react";
import classNames from "classnames";
import PhotoGallery from "components/photoGallery";
import { Col, Row, UncontrolledTooltip, Collapse } from "reactstrap";
import Thumbnail from "components/thumbnail";
import Icon from "components/icon";
import Pill from "components/pillData";
import StatusBadge from "components/statusBadge";
import { getLanguageListText } from "utils";
import I18N from "i18n";
import UserBox from "components/userBox";
import PillsBGG from "./pillsBGG";
import BanButton from "components/ban/banButton";

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
  afterAnyChange,
  notBan,
}) => {
  const id = useId("a").replace(twoPointsReg, "");

  const [imagesCollapseOpen, set_imagesCollapseOpen] = useState(false);
  const [images, set_images] = useState([]);

  useEffect(() => {
    if (element && element.images && element.images !== "") {
      const newImages = element.images.split(",");
      set_images(newImages);
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
            <div className="element-full-title">
              {element.type === 3 ? (
                <span className="element-full-title_in">{element?.name}</span>
              ) : (
                <>
                  <a
                    href={`https://boardgamegeek.com/boardgame/${element?.bgg_id}/`}
                    target="_blank"
                    className="element-full-title_in bgg-link"
                    id={`bgg-game-link-${id}`}
                  >
                    {element?.name}
                    <Icon type="external-link" />
                  </a>
                  <UncontrolledTooltip target={`bgg-game-link-${id}`}>
                    <div className="bgg-game-info_tooltip">
                      <I18N id="element.BGG.OpenGameInBGG" />
                    </div>
                  </UncontrolledTooltip>
                </>
              )}
              <div
                className={classNames(
                  "element-type-badge",
                  `b-${element.type}`
                )}
              >
                <I18N id={`element-type-badge-${element.type}`} />
              </div>
              {!isCombo && !notBan ? (
                <BanButton
                  label="ban.Item"
                  element={item}
                  type="item"
                  afterAnyChange={afterAnyChange}
                  className="ms-2"
                />
              ) : null}
              {!isCombo && groupHeader}
            </div>
            <div className="element-full-pills">
              {element.type === 3 ? null : <PillsBGG element={element} />}

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
                  {images.length ? (
                    <Col xs="12">
                      <div className="element-full-photoGallery">
                        <div
                          className={classNames(
                            "element-full-photoGallery-title",
                            { "is-open": imagesCollapseOpen }
                          )}
                          onClick={() => {
                            set_imagesCollapseOpen((v) => !v);
                          }}
                        >
                          <Icon type="chevron-right" className="me-1" />
                          <I18N id="photoGallery.full.title" />
                        </div>
                        <Collapse isOpen={imagesCollapseOpen}>
                          {imagesCollapseOpen ? (
                            <div className="element-full-photoGallery-container">
                              <PhotoGallery list={images} />
                            </div>
                          ) : null}
                        </Collapse>
                      </div>
                    </Col>
                  ) : null}
                </Row>
              )}
            </div>
            {!forGame && !isCombo && showUser ? (
              <div className="element-full-user">
                <UserBox item={item} afterAnyChange={afterAnyChange} />
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
