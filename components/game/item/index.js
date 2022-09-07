import { Col, Row } from "reactstrap";
import Checkbox from "components/checkbox";
import UserPublished from "components/user_published";
import ItemGameElement from "./element";
import classNames from "classnames";

const ItemGame = ({ item, bggId, itemsSelected, setItemsSelected }) => {
  return (
    <div className={classNames("item-game", { owner: item.owner })}>
      <Row className="g-0">
        <Col xs="auto" className="pe-2">
          <div className="item-game-elementlist-checkbox">
            <Checkbox
              value={itemsSelected.indexOf(item.id) >= 0 && !item.owner}
              onClick={() => {
                if (!item.owner) {
                  setItemsSelected((list) => {
                    const currentList = [...list];
                    const index = currentList.indexOf(item.id);
                    if (index >= 0) {
                      currentList.splice(index, 1);
                    } else {
                      currentList.push(item.id);
                    }
                    return currentList;
                  });
                }
                // let newList = [];
                // if (!myItemsIdToChangeSelectAll) {
                //   newList = myItemList.map((itm) => {
                //     return itm.id;
                //   });
                //   setMyItemsIdToChangeSelectAll(true);
                // } else {
                //   setMyItemsIdToChangeSelectAll(false);
                // }
                // onChangeList(newList);
              }}
            />
          </div>
        </Col>
        <Col>
          {item?.elements?.length > 1 ? (
            <div className="item-game-elementlist-combo">Combo:</div>
          ) : null}
          <div
            className={classNames("item-game-elementlist", {
              "for-combo": item?.elements?.length > 1,
            })}
          >
            {item?.elements?.map((element, k) => {
              return (
                <ItemGameElement
                  key={k}
                  element={element}
                  isCombo={item.elements.length > 1}
                />
              );
            })}
          </div>
        </Col>
        <Col xs="auto">
          {!item.owner ? (
            <UserPublished user={item?.user} />
          ) : (
            <div className="user-own-item">Item propio</div>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default ItemGame;
