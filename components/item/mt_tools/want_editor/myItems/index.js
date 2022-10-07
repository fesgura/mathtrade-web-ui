import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/myCollection";
import { useApi, MathTradeService } from "api";
import { getMathtradeStored } from "utils";

import ErrorAlert from "components/errorAlert";
import { Col, Row } from "reactstrap";
import Picture from "components/picture";
import { ValuationLabel } from "components/valuation";
import Checkbox from "components/checkbox";
import OrderBy from "components/orderBy";
import classNames from "classnames";
import { LoadingBox } from "components/loading";

const MyItems = ({ onChangeList, myItemsToOffer }) => {
  const [orderByOpt, setOrderByOpt] = useState(null);

  const [myItemsIdToChangeSelectAll, setMyItemsIdToChangeSelectAll] =
    useState(false);

  const [getMyItemsInMathTrade, myItemList, loading, errors] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: [],
  });

  useEffect(() => {
    const mathtradeStored = getMathtradeStored();
    getMyItemsInMathTrade({ mathTradeId: mathtradeStored.data.id });
  }, []);

  return errors ? (
    <ErrorAlert errors={errors} />
  ) : (
    <div className="min-list-items">
      <div className="min-list-items_header">
        <Row className="align-items-center g-0">
          <Col xs="auto" className="pe-2">
            <Checkbox
              value={myItemsIdToChangeSelectAll}
              onClick={() => {
                let newList = [];
                if (!myItemsIdToChangeSelectAll) {
                  newList = myItemList.map((itm) => {
                    return itm.id;
                  });
                  setMyItemsIdToChangeSelectAll(true);
                } else {
                  setMyItemsIdToChangeSelectAll(false);
                }

                onChangeList(newList);
              }}
            />
          </Col>
          <Col className="ps-2">
            <b>Mis items:</b>
          </Col>
          <Col xs="auto" className="ps-2">
            <OrderBy
              onChange={setOrderByOpt}
              options={[
                {
                  text: "Nombre",
                  value: "title",
                },
                {
                  text: "Valor",
                  value: "value",
                },
              ]}
            />
          </Col>
        </Row>
      </div>
      {loading ? (
        <LoadingBox />
      ) : (
        myItemList
          .sort((a, b) => {
            switch (orderByOpt) {
              case "title":
                return a.title < b.title ? -1 : 1;
              case "value":
                return a.value > b.value ? -1 : 1;
              default:
                return 0;
            }
          })
          .map((itm) => {
            const { title, elements, value, id } = itm;
            const index = myItemsToOffer.indexOf(id);
            return (
              <div
                className={classNames("min-item", { selected: index >= 0 })}
                key={id}
              >
                <Row className="align-items-center g-0">
                  <Col xs="auto">
                    <Checkbox
                      value={index >= 0}
                      onClick={() => {
                        let currentListCopy = [...myItemsToOffer];
                        if (index >= 0) {
                          currentListCopy.splice(index, 1);
                        } else {
                          currentListCopy = currentListCopy.concat([id]);
                        }

                        onChangeList(currentListCopy);
                      }}
                    />
                  </Col>
                  <Col xs="auto" className="px-3">
                    <Picture src={elements[0].thumbnail} width={30} />
                  </Col>
                  <Col>
                    {elements.length > 1 ? <b>Combo:</b> : null}
                    {title}
                  </Col>
                  <Col xs="auto" className="ps-2">
                    <ValuationLabel value={value} />
                  </Col>
                </Row>
              </div>
            );
          })
      )}
    </div>
  );
};

export default MyItems;
