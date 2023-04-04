import { Col, Row } from "reactstrap";
import Quad from "./quad";
import { useEffect, useState } from "react";
import I18N from "i18n";
import UserOffer from "./userOffer";

const MyItem = ({ item }) => {
  const [wantedList, setWantedList] = useState([]);

  useEffect(() => {
    if (item.wanted && item.wanted.length) {
      const newWanted = [...item.wanted];

      const poolUsers = {};

      newWanted.forEach((itm) => {
        const { user } = itm;

        if (!poolUsers[user.id]) {
          poolUsers[user.id] = {
            id: user.id,
            user,
            items: [],
          };
        }

        poolUsers[user.id].items.push(itm);
      });

      const newWantedList = [];

      for (let a in poolUsers) {
        newWantedList.push(poolUsers[a]);
      }
      newWantedList.sort((a, b) => {
        return a.items.length < b.items.length ? -1 : 1;
      });

      setWantedList(newWantedList);
    } else {
      setWantedList([]);
    }
  }, [item]);

  return (
    <div className="post-mt-myItem">
      <div className="post-mt-myItem_container">
        <Row className="g-0 flex-nowrap align-items-stretch">
          <Col xs="auto">
            <div className="post-mt-myItem_quad-myItem">
              <div className="post-mt-myItem_label">
                <I18N id="postMT.ForMyItem" />
              </div>
              <Quad item={item} />
            </div>
          </Col>
          <Col xs="auto">
            <div className="post-mt-myItem_quad-row_divisor">
              <div className="post-mt-myItem_quad-row_divisor-t1" />
              <div className="post-mt-myItem_quad-row_divisor-t2" />
            </div>
          </Col>
          <Col>
            <div className="post-mt-myItem_quad-row_container">
              <div className="post-mt-myItem_label receive">
                <I18N id="postMT.OtherOffer" />
              </div>

              {wantedList.length ? (
                wantedList.map((userOff) => {
                  return (
                    <UserOffer userOff={userOff} key={userOff.id} item={item} />
                  );
                })
              ) : (
                <div className="italic">
                  <I18N id="postMT.notItems" />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default MyItem;
