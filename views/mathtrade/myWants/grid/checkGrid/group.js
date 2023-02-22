import CheckItem from "./item";

const CheckGroup = ({
  wantGroup,
  myItemGroup,
  set_wantListGrid,
  //
  setList,
  isMouseDown,
  onMouseDown,
}) => {
  return (
    <>
      <CheckItem
        wantGroup={wantGroup}
        myItemGroup={myItemGroup}
        set_wantListGrid={set_wantListGrid}
        itemMy={myItemGroup.item || null}
        //
        setList={setList}
        isMouseDown={isMouseDown}
        onMouseDown={onMouseDown}
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
                //
                setList={setList}
                isMouseDown={isMouseDown}
                onMouseDown={onMouseDown}
              />
            );
          })
        : null}
    </>
  );
};
export default CheckGroup;
