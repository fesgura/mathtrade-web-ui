import { useState, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import MyGroup from "./myItems/group";
import MyItem from "./myItems/item";
import WantGroup from "./myWants/group";
import WantItem from "./myWants/item";

const Grid = ({ myItemList, wantList, setWantList, setMyItemList }) => {
  // console.log("wantList", wantList);
  return (
    <Card>
      <CardBody>
        <div className="mywants-grid_container">
          <div className="mywants-grid_myItems-container">
            <div className="mywants-grid_myItems-row">
              <div className="mywants-grid_myItems-left-spacer" />
              {myItemList.map((obj, k) => {
                switch (obj.type) {
                  case "group":
                    return (
                      <MyGroup
                        key={k}
                        group={obj}
                        setMyItemList={setMyItemList}
                      />
                    );
                  case "item":
                    return <MyItem key={k} item={obj.item} isExtended={true} />;
                  default:
                  //
                }
              })}
            </div>
          </div>
          <div className="mywants-grid_wantListGrid-container">
            <div className="mywants-grid_wantListGrid-row">
              <div className="mywants-grid_wantListGrid-col-left">
                {wantList.map((obj, k) => {
                  switch (obj.type) {
                    case "group":
                    case "game":
                      return (
                        <WantGroup
                          key={obj.id + "-group"}
                          group={obj}
                          isGame={obj.type === "game"}
                          setWantList={setWantList}
                        />
                      );
                    case "item":
                      return (
                        <WantItem
                          key={obj.id + "-group"}
                          item={obj.availableWantItems[0]}
                          isExtended={true}
                        />
                      );
                    default:
                    //
                  }
                })}
              </div>
              <div className="mywants-grid_wantListGrid-col-right"></div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Grid;
