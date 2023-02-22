import CheckItem from "./item";

const CheckGroup = ({
  wantGroup,
  myItemGroup,
  putWant,
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
        putWant={putWant}
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
                putWant={putWant}
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
