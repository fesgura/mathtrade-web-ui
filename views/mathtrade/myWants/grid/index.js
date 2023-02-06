import Icon from "components/icon";
import { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Input } from "components/form";
import { getUniqueId } from "utils";
import MyGroup from "./myItems/group";
import MyItem from "./myItems/item";
import WantGroup from "./myWants/group";
import WantItem from "./myWants/item";
import ColGrid from "./checkGrid/colGrid";

const Grid = ({ myItemList, wantList, setWantList, setMyItemList }) => {
  const [extendAll, setExtendAll] = useState({
    extended: true,
    d: getUniqueId(),
  });

  return (
    <Card>
      <CardBody>
        <div className="mywants-grid_container">
          <div className="mywants-grid_myItems-container">
            <div className="mywants-grid_myItems-row">
              <div className="mywants-grid_myItems-left-spacer">
                <div className="mywants-grid_myItems-left-spacer_cont">
                  <div className="mywants-grid_myItems-left-lab_my_items">
                    <Icon type="arrow-down" /> Mis propios items
                  </div>
                  <div className="mywants-grid_myItems-left-lab_my_wants">
                    <Icon type="arrow-down" /> Mis wants
                  </div>
                  <div className="mywants-grid_myItems-left-lab_cont-line" />
                  <div className="mywants-grid_myItems-left-lab_cont">
                    <Input
                      data={extendAll}
                      type="checkbox"
                      labelCheckbox={<div className="small">Extender todo</div>}
                      name="extended"
                      onChange={() => {
                        setExtendAll((v) => {
                          const newExtendAll = {
                            extended: !v.extended,
                            d: getUniqueId(),
                          };
                          return newExtendAll;
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              {myItemList.map((obj, k) => {
                switch (obj.type) {
                  case "group":
                    return (
                      <MyGroup
                        key={k}
                        group={obj}
                        setMyItemList={setMyItemList}
                        extendAll={extendAll}
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
                {wantList.map((obj) => {
                  switch (obj.type) {
                    case "group":
                    case "game":
                      return (
                        <WantGroup
                          key={obj.id + "-group"}
                          group={obj}
                          isGame={obj.type === "game"}
                          setWantList={setWantList}
                          extendAll={extendAll}
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
              <div className="mywants-grid_wantListGrid-col-right">
                <div className="mywants-grid_check-grid-row">
                  {myItemList.map((myItemElement, k) => {
                    return (
                      <ColGrid
                        key={k}
                        myItemElement={myItemElement}
                        wantList={wantList}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Grid;
