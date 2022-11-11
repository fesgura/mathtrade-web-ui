import { useId, useState, useEffect } from "react";
import GroupTag from "./groupTag";
import AddGroup from "components/addGroup";
import Icon from "components/icon";

const SidebarGroupList = ({
  groups = [],
  groupIdSelected,
  setGroupIdSelected,
  afterAnyChange,
  itemListTotal,
}) => {
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [countSinAgrupar, setCountSinAgrupar] = useState(0);

  useEffect(() => {
    console.log(groups);
    if (groups) {
      let countAgrupados = 0;
      groups.forEach((g) => {
        countAgrupados += g.items.length;
      });

      setCountSinAgrupar(itemListTotal - countAgrupados);
    }
  }, [groups, itemListTotal]);

  return (
    <>
      <div className="sidebar-group-list">
        <div className="sidebar-group-list_wrap">
          <h4 className="py-3">Grupos</h4>
          <div className="sidebar-group-list_list">
            <GroupTag
              group={{
                id: -1,
                name: "Sin agrupar",
                color: "#FFFFFF",
              }}
              groupIdSelected={groupIdSelected}
              setGroupIdSelected={setGroupIdSelected}
              count={countSinAgrupar}
            />
            {groups.map((group) => {
              return (
                <GroupTag
                  key={group.id}
                  group={group}
                  groupIdSelected={groupIdSelected}
                  setGroupIdSelected={setGroupIdSelected}
                  count={group?.items?.length || 0}
                  afterAnyChange={afterAnyChange}
                />
              );
            })}
          </div>
          <div className="text-center py-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setModalAddOpen(true);
              }}
            >
              <Icon type="plus" /> Agregar grupo
            </a>
          </div>
        </div>
      </div>

      {modalAddOpen ? (
        <AddGroup
          onCancel={() => {
            setModalAddOpen(false);
          }}
          afterAnyChange={afterAnyChange}
        />
      ) : null}
    </>
  );
};

export default SidebarGroupList;

/* 

          <hr />
          <Row>
            <Col xs={6}>
              <Dropper accept="item" data={{ saludo: "HOsssLA" }}>
                <div className="dropper-temp">Dropper</div>
              </Dropper>
            </Col>
            <Col xs={6}>
              <Dragger
                type="item"
                data={{ saluta: "Omar" }}
                onDrop={(dataDragger, dataDropper) => {
                  
                }}
              >
                <div className="dragger-temp"></div>
              </Dragger>
            </Col>
          </Row>

          <hr /> */
