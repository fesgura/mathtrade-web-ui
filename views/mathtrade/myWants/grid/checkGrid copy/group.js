import CheckItem from "./item";

const CheckGroup = ({
  wantGroup,
  myItemGroup,
  set_wantListGrid,
  //
  groupHits,
  setGroupHits,
  //
  setList,
  isMouseDown,
  onMouseDown,
  canEditWants,
}) => {
  return (
    <>
      <CheckItem
        wantGroup={wantGroup}
        myItemGroup={myItemGroup}
        set_wantListGrid={set_wantListGrid}
        itemMy={myItemGroup.item || null}
        //
        onHit={() => {
          setGroupHits((a) => {
            const b = [...a];
            b.push(`${wantGroup.idkey}-${myItemGroup.idkey}`);
            return b;
          });
        }}
        setList={setList}
        isMouseDown={isMouseDown}
        onMouseDown={onMouseDown}
        canEditWants={canEditWants}
      />
      {myItemGroup.type === "group"
        ? myItemGroup.items.map((itm) => {
            return (
              <CheckItem
                key={itm.id}
                wantGroup={wantGroup}
                myItemGroup={myItemGroup}
                set_wantListGrid={set_wantListGrid}
                itemMy={itm}
                isInner
                groupHits={groupHits}
                //
                setList={setList}
                isMouseDown={isMouseDown}
                onMouseDown={onMouseDown}
                canEditWants={canEditWants}
              />
            );
          })
        : null}
    </>
  );
};
export default CheckGroup;
