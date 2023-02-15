import classNames from "classnames";
import { Row, Col } from "reactstrap";
import { ValuationMin } from "components/valuation";
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
  onClickCheckbox = () => {},
  hideCheckbox,
  hideUser,
  hideExtraData,
  ownUser,
}) => {
  const { title, elements, value } = item;

  return (
    <div className={classNames("item-minimal", { selected, disabled })}>
      <div className="item-minimal_cont">
        <Row className="align-items-center g-0 flex-nowrap">
          {hideCheckbox ? null : (
            <Col xs="auto">
              <div className="item-minimal_checkbox">
                <Checkbox
                  value={selected}
                  onClick={onClickCheckbox}
                  disabled={disabled}
                />
              </div>
            </Col>
          )}
          <Col xs="auto">
            <div className="item-minimal_thumbnail">
              <Thumbnail src={elements[0].thumbnail} />
            </div>
          </Col>
          <Col>
            <div className="item-minimal_title">
              <div className="item-minimal_title-text">
                {elements.length > 1 ? (
                  <b>
                    <I18N id="Combo" />:{" "}
                  </b>
                ) : null}
                {cropWord(title, 50, "...")}
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
            <Col xs="auto">
              <div className="item-minimal_user">
                {ownUser ? (
                  <div className="item-minimal_own_user">
                    <I18N id="wantEditor.btn.OwnItem" />
                  </div>
                ) : (
                  <UserBox item={item} />
                )}
              </div>
            </Col>
          )}
          <Col xs="auto">
            <div className="item-minimal_previewer">
              <Previewer>
                <ItemFull item={item} inModal />
              </Previewer>
            </div>
          </Col>
          <Col xs="auto">
            <div className="item-minimal_valuation">
              <ValuationMin value={value} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ItemMinimal;
