import WantGroup from "./group";
import WantItem from "./item";

const MyWants = ({
  wantList,
  set_wantListGrid,
  putWant,
  deleteWant,
  reloadWants,
  canEditWants,
}) => {
  return (
    <>
      {wantList.list.map((obj) => {
        switch (obj.type) {
          case "group":
          case "game":
            return (
              <WantGroup
                key={obj.idkey}
                group={obj}
                set_wantListGrid={set_wantListGrid}
                putWant={putWant}
                deleteWant={deleteWant}
                reloadWants={reloadWants}
                canEditWants={canEditWants}
              />
            );
          case "item":
            return (
              <WantItem
                key={obj.idkey}
                item={obj.items[0]}
                group={obj}
                deleteWant={deleteWant}
                isExtended={true}
                reloadWants={reloadWants}
                canEditWants={canEditWants}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};
export default MyWants;
