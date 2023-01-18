import { useId, useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
import CardComp from "components/cardComp";
import UserBox from "components/userBox";
import Icon from "components/icon";
import { Col, Row } from "reactstrap";
import classNames from "classnames";
import Thumbnail from "components/thumbnail";
import BggGameBox from "components/bggGameBox";
import ItemMinimal from "components/itemMinimal";
import Checkbox from "components/checkbox";

const ItemListToWant = ({ itemListToWant, want_ids, setWantId }) => {
  return (
    <>
      {itemListToWant.map((item) => {
        const { id, owner } = item;
        const selected = want_ids.indexOf(id) >= 0;
        return (
          <div
            className={classNames("item-minimal_wrap", {
              selected,
            })}
            key={id}
          >
            <Row className="align-items-center g-0">
              <Col xs="auto">
                <Checkbox
                  value={selected}
                  onClick={() => {
                    setWantId(id);
                  }}
                  disabled={owner}
                />
              </Col>
              <Col className="ps-3 pe-1">
                <ItemMinimal item={item} disabled={owner} />
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );

  /*
  (

  );
  */
};

export default ItemListToWant;
