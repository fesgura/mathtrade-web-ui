import classNames from "classnames";
import { Row, Col } from "reactstrap";
import Valuation from "components/valuation";
import Checkbox from "components/checkbox";
import Thumbnail from "components/thumbnail";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";
import UserBox from "components/userBox";
import { cropWord, getLanguageListText } from "utils";
import I18N from "i18n";
import StatusBadge from "components/statusBadge";

const ItemMinimal = ({
  item,
  selected,
  disabled,
  disabledCheck,
  onClickCheckbox = () => {},
  customCheckbox,
  hideCheckbox,
  hideUser,
  hideExtraData,
  notHighOnSelected,
  ownUser,
  rotated,
  inverted,
  cropTitle = 50,
  afterAnyChange = () => {},
}) => {
  const { title, elements, value } = item;

  let orderNum = inverted ? 6 : 1;

  return (
    <div
      className={classNames("item-minimal", {
        selected: notHighOnSelected ? false : selected,
        disabled,
        rotated,
      })}
    >
      <div className="item-minimal_cont">
        <Row className="align-items-center g-0 flex-nowrap">
          {hideCheckbox ? null : (
            <Col
              xs={{
                order: (() => {
                  return inverted ? orderNum-- : orderNum++;
                })(),
                size: "auto",
              }}
            >
              <div className="item-minimal_checkbox">
                {customCheckbox || (
                  <Checkbox
                    value={selected}
                    onClick={onClickCheckbox}
                    disabled={disabled || disabledCheck}
                  />
                )}
              </div>
            </Col>
          )}
          <Col
            xs={{
              order: (() => {
                return inverted ? orderNum-- : orderNum++;
              })(),
              size: "auto",
            }}
          >
            <div className="item-minimal_thumbnail">
              <Thumbnail src={elements[0].thumbnail} height={26} />
            </div>
          </Col>
          <Col
            className={`order-${(() => {
              return inverted ? orderNum-- : orderNum++;
            })()} text-${inverted ? "end" : "start"}`}
          >
            <div className="item-minimal_title">
              <div className="item-minimal_title-text">
                {elements.length > 1 ? (
                  <b>
                    <I18N id="Combo" />:{" "}
                  </b>
                ) : null}
                {cropWord(title, cropTitle, "...")}
              </div>
              {hideExtraData ? null : (
                <div className="item-minimal_title-subtitle">
                  <span>{getLanguageListText(elements[0].language)}</span>

                  <StatusBadge status={elements[0].status} />
                </div>
              )}
            </div>
          </Col>
          {hideUser ? null : (
            <Col
              xs={{
                order: (() => {
                  return inverted ? orderNum-- : orderNum++;
                })(),
                size: "auto",
              }}
            >
              <div className="item-minimal_user">
                {ownUser ? (
                  <div className="item-minimal_own_user">
                    <I18N id="wantEditor.btn.OwnItem" />
                  </div>
                ) : (
                  <UserBox item={item} notBan />
                )}
              </div>
            </Col>
          )}
          <Col
            xs={{
              order: (() => {
                return inverted ? orderNum-- : orderNum++;
              })(),
              size: "auto",
            }}
          >
            <div className="item-minimal_previewer">
              <Previewer id={item.id} comments/>               
            </div>
          </Col>
          <Col
            xs={{
              order: (() => {
                return inverted ? orderNum-- : orderNum++;
              })(),
              size: "auto",
            }}
          >
            <div className="item-minimal_valuation">
              <Valuation items={[item]} min afterAnyChange={afterAnyChange} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ItemMinimal;
