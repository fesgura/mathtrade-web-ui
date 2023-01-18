import { useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import ErrorAlert from "components/errorAlert";
import { Col, Row } from "reactstrap";
import Thumbnail from "components/thumbnail";
import { ValuationLabel } from "components/valuation";
import Checkbox from "components/checkbox";
import OrderBy from "components/orderBy";
import classNames from "classnames";
import Previewer from "components/previewer";
import ItemExtense from "components/itemExtense";
import { LoadingBox } from "components/loading";

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
      <div className="my-item-minimal">
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
            <Thumbnail src={elements[0].thumbnail} width={30} height={30} />
          </Col>
          <Col>
            {elements.length > 1 ? <b>Combo:</b> : null}
            {title}
          </Col>
          <Col xs="auto">
            <Previewer>
              <ItemExtense item={item} inModal showUser={false} />
            </Previewer>
          </Col>
          <Col xs="auto" className="ps-2">
            <ValuationLabel value={value} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Item;
