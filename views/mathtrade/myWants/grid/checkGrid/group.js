import CheckItem from "./item";

const CheckGroup = ({ wantGroup, myItemGroup, putWant }) => {
  return (
    <>
      <CheckItem
        wantGroup={wantGroup}
        myItemGroup={myItemGroup}
        putWant={putWant}
        itemMy={myItemGroup.item || null}
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
              />
            );
          })
        : null}
    </>
  );
};
export default CheckGroup;
