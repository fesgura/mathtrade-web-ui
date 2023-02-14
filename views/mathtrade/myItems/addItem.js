import { useState, useEffect } from "react";
import Icon from "components/icon";
import ItemMinimal from "components/item/minimal";
import { Button, Col, Row } from "reactstrap";
import { LoadingBox } from "components/loading";
import LinkInternal from "components/link-internal";
import ErrorAlert from "components/errorAlert";

const AddItemView = ({
  onClose,
  collectionList,
  itemList,
  loading,
  errors,
  publishItem,
}) => {
  const [items, seItems] = useState([]);

  useEffect(() => {
    const list = collectionList.filter((itemInCollection) => {
      const arrayItems = itemList.filter((itemInList) => {
        return itemInCollection.id === itemInList.id;
      });
      return arrayItems.length === 0;
    });
    seItems(list);
  }, [collectionList, itemList]);

  return (
    <div className="relative">
      <h3 className="text-center pt-2 mb-3">Agregar al Math Trade</h3>
      <hr className="m-0" />
      <div style={{ minHeight: 150 }}>
        {items.map((item, k) => {
          return (
            <div key={`${item.id}-${k}`} className="pt-1">
              <Row className="align-items-center mb-1 g-0">
                <Col>
                  <ItemMinimal item={item} hideUser hideCheckbox />
                </Col>
                <Col xs="auto" className="ps-2">
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => {
                      publishItem(item);
                    }}
                  >
                    <Icon type="plus" className="me-1" />
                    Agregar
                  </Button>
                </Col>
              </Row>
              <hr className="m-0" />
            </div>
          );
        })}
        {items.length === 0 && !loading ? (
          <div className="text-center pt-5">
            <p className="lead">
              Por favor, comienza agregando items a{" "}
              <LinkInternal path="myCollection">tu colección</LinkInternal>.
            </p>
          </div>
        ) : null}
      </div>
      <div className="text-center pt-3">
        <Button onClick={onClose}>Cerrar</Button>
      </div>
      <ErrorAlert errors={errors} />
      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default AddItemView;
