import { useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import ErrorAlert from "components/errorAlert";
import { Col, Row } from "reactstrap";
import Thumbnail from "components/thumbnail";
import { ValuationTitle } from "components/valuation";
import Checkbox from "components/checkbox";
import OrderBy from "components/orderBy";
import classNames from "classnames";
import Previewer from "components/previewer";
import ItemFull from "components/item/full";
import { LoadingBox } from "components/loading";
import I18N from "i18n";

const Item = ({ item, item_ids, setMyItemIds }) => {
  const { title, elements, value, id } = item;
  const selected = item_ids.indexOf(id) >= 0;
  return (
    <div
      className={classNames("item-minimal_wrap", {
        selected,
      })}
      key={id}
    >
      <div className="item-minimal">
        <Row className="align-items-center g-0">
          <Col xs="auto">
            <Checkbox
              value={selected}
              onClick={() => {
                setMyItemIds([id]);
              }}
            />
          </Col>
          <Col xs="auto" className="px-3">
            <div className="item-minimal_thumbnail">
              <Thumbnail src={elements[0].thumbnail} />
            </div>
          </Col>
          <Col>
            {elements.length > 1 ? (
              <b>
                <I18N id="Combo" />:
              </b>
            ) : null}
            {title}
          </Col>
          <Col xs="auto">
            <Previewer>
              <ItemFull item={item} inModal showUser={false} />
            </Previewer>
          </Col>
          <Col xs="auto" className="ps-2">
            <div className="valuation-title">
              <ValuationTitle value={value} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Item;
