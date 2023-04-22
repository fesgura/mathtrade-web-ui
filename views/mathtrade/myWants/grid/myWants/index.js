import WantGroup from "./group";
import WantItem from "./item";

const MyWants = ({
  page,
  page_size,
  filterKeyword,
  wantList,
  set_wantListGrid,
  putWant,
  deleteWant,
  reloadWants,
  canEditWants,
}) => {
  return (
    <>
      {wantList.list
        .filter((obj) => {
          if (!filterKeyword || filterKeyword === "") {
            return true;
          }
          return obj.title.toLowerCase().indexOf(filterKeyword) >= 0;
        })
        .map((obj, k) => {
          if (k < page * page_size || k >= (page + 1) * page_size) {
            return null;
          }

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
                  set_wantListGrid={set_wantListGrid}
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
