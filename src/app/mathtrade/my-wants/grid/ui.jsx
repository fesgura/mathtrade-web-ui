import useGrid from "./useGrid";
import WantGroupLabel from "@/components/want-components/grid/wantGroupLabel";
import MyItemLabel from "@/components/want-components/grid/myItemLabel";
import Cell from "@/components/want-components/grid/cell";
import EmptyList from "@/components/emptyList";
import I18N from "@/i18n";

const GridUI = () => {
  //  const cols = 15;

  const {
    emptyWants,
    rootRef,
    readyToRender,
    wantList,
    myItemList,
    showNoOptionsAdv,
  } = useGrid();

  if (emptyWants) {
    return <EmptyList visible message="MyWants.EmptyList" />;
  }

  return (
    <div className="sticky top-16">
      <div
        className="border-spacing-0 bg-white w-full h-mygrid overflow-scroll pb-8 select-none"
        style={{ contain: "paint" }}
        ref={rootRef}
      >
        {readyToRender ? (
          <table className="grid-table">
            <thead className="sticky z-50 top-0 bg-white">
              <tr className="border-spacing-0">
                {myItemList.map((myItem, k) => {
                  return k === 0 ? (
                    <th key={k} className="border-spacing-0 m-0 p-0 relative">
                      {showNoOptionsAdv ? (
                        <div className="border-b border-r border-gray-300 w-full absolute bottom-0 top-0">
                          <div
                            className="
                        p-3 flex gap-1 justify-center items-center text-xs"
                          >
                            <div className="w-5 h-5 shadow-[inset_0_0_0_3px_red]"></div>
                            <div className="">
                              {"= "}
                              <I18N id="noOptionsInWant" />
                            </div>
                          </div>
                        </div>
                      ) : null}
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
                  <tr key={wantGroup.id} className="border-spacing-0">
                    {myItemList.map((myItem, k) => {
                      return k === 0 ? (
                        <td
                          className="border-spacing-0 m-0 p-0 sticky z-40 left-0"
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
