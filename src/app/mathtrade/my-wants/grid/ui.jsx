import useGrid from "./useGrid";
import WantGroupLabel from "@/components/want-components/grid/wantGroupLabel";
import MyItemLabel from "@/components/want-components/grid/myItemLabel";
import Cell from "@/components/want-components/grid/cell";
import Container from "@/components/container";
import EmptyList from "@/components/emptyList";

const GridUI = () => {
  //  const cols = 15;

  const { emptyWants, rootRef, readyToRender, wantList, myItemList } =
    useGrid();

  if (emptyWants) {
    return (
      <Container>
        <EmptyList visible message="MyWants.EmptyList" />
      </Container>
    );
  }

  return (
    <div className="sticky top-16">
      <div
        className="border-spacing-0 bg-white w-full h-mygrid overflow-scroll  xscrollbar xoverscroll-contain select-none"
        style={{ contain: "paint" }}
        ref={rootRef}
      >
        {readyToRender ? (
          <table>
            <thead className="sticky z-50 top-0 bg-white">
              <tr className="border-spacing-0">
                {myItemList.map((myItem, k) => {
                  return k === 0 ? (
                    <th key={k} className="border-spacing-0 m-0 p-0 relative">
                      <div className="border-b border-r border-gray-300 w-full absolute bottom-0 top-0" />
                    </th>
                  ) : (
                    <th key={k} className="border-spacing-0 m-0 p-0">
                      <MyItemLabel rootRef={rootRef} myItem={myItem} />
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {wantList.map((wantGroup, j) => {
                /* if (j >= 4) {
                  return null;
                } */
                return (
                  <tr
                    key={wantGroup.id}
                    className="border-spacing-0 hover:bg-gray-200"
                  >
                    {myItemList.map((myItem, k) => {
                      return k === 0 ? (
                        <td
                          className="border-spacing-0 m-0 p-0 sticky left-0"
                          key={k}
                        >
                          <WantGroupLabel
                            rootRef={rootRef}
                            wantGroup={wantGroup}
                          />
                        </td>
                      ) : (
                        <Cell
                          rootRef={rootRef}
                          wantGroup={wantGroup}
                          myItem={myItem}
                          key={k}
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center pt-5">Cargando...</div>
        )}
      </div>
    </div>
  );
};

export default GridUI;
