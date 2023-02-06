import RowGrid from "./rowGrid";

const ColGrid = ({ myItemElement, wantList, setWantList }) => {
  return (
    <>
      <div className="mywants-grid_check-grid-col">
        {wantList.map((wantElement, k) => {
          return (
            <RowGrid
              key={k}
              myItemElement={myItemElement}
              wantElement={wantElement}
              myItem={myItemElement.type === "item" ? myItemElement.item : null}
              isInnerMyItemElement={false}
              setWantList={setWantList}
            />
          );
        })}
      </div>

      {myItemElement.type === "group"
        ? myItemElement.items.map((item, j) => {
            return (
              <div className="mywants-grid_check-grid-col" key={j}>
                {wantList.map((wantElement, k) => {
                  return (
                    <RowGrid
                      key={k}
                      myItemElement={myItemElement}
                      myItem={item}
                      wantElement={wantElement}
                      isInnerMyItemElement={true}
                      setWantList={setWantList}
                    />
                  );
                })}
              </div>
            );
          })
        : null}
    </>
  );
};
export default ColGrid;
