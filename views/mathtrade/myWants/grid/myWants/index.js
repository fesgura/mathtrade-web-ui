import WantGroup from "./group";
import WantItem from "./item";

const MyWants = ({ wantList, set_wantListGrid, putWant, reloadWants }) => {
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
                reloadWants={reloadWants}
              />
            );
          case "item":
            return (
              <WantItem
                key={obj.idkey}
                item={obj.items[0]}
                group={obj}
                isExtended={true}
                reloadWants={reloadWants}
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
