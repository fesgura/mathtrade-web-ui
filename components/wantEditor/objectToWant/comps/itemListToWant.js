import { useState, useEffect } from "react";
import storage from "utils/storage";
import { Col, Row } from "reactstrap";
import classNames from "classnames";
import ItemMinimal from "components/itemMinimal";
import Checkbox from "components/checkbox";

const ItemListToWant = ({ itemListToWant, want_ids, setWantId }) => {
  const [myUserId, set_myUserId] = useState("");

  useEffect(() => {
    const store = storage.get();
    set_myUserId(store?.user?.data?.id);
  }, []);

  return (
    <>
      {itemListToWant.map((item) => {
        const { id, user } = item;

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
                  disabled={user.id === myUserId}
                />
              </Col>
              <Col className="ps-3 pe-1">
                <ItemMinimal
                  item={item}
                  disabledByOwner={user.id === myUserId}
                />
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
