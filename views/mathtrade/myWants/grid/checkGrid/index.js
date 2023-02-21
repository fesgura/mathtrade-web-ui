import CheckGroup from "./group";

const Grid = ({ myItemList, wantList, putWant }) => {
  return wantList.map((wantGroup) => {
    return (
      <div className="mw_grid-row" key={wantGroup.idkey}>
        {myItemList.map((myItemGroup) => {
          return (
            <CheckGroup
              key={myItemGroup.idkey}
              wantGroup={wantGroup}
              myItemGroup={myItemGroup}
              putWant={putWant}
            />
          );
        })}
      </div>
    );
  });
};
export default Grid;
