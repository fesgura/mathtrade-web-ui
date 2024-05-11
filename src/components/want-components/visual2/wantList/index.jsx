import Icon from "@/components/icon";
import useWantList from "./useWantList";
import clsx from "clsx";
import I18N from "@/i18n";
import WantGroupVisual2 from "./wantGroup";

const WantListVisual2 = ({ item }) => {
  const {
    itemId,
    wantsAdded,
    wantsToAdd,
    addOpen,
    toggleAddOpen,
    addPadRef,
    canIwant,
  } = useWantList(item);

  return (
    <>
      {!wantsAdded.length ? (
        <h4 className="mb-5 italic text-gray-500">
          <I18N id="notOfferedVisual2" />
        </h4>
      ) : null}
      <div className="flex flex-wrap gap-5">
        {wantsAdded.length
          ? wantsAdded.map((wantGroup) => {
              return (
                <WantGroupVisual2
                  key={wantGroup.id}
                  wantGroup={wantGroup}
                  itemId={itemId}
                />
              );
            })
          : null}

        {wantsToAdd.length && canIwant ? (
          <button
            className={clsx(
              "relative sm:w-32 w-16 aspect-square rounded-lg shadow-xl transition-colors",
              {
                "bg-white/60 text-gray-400 hover:bg-want hover:text-white":
                  !addOpen,
                "bg-want text-white": addOpen,
              }
            )}
            onClick={toggleAddOpen}
          >
            <div
              className={clsx(
                "sm:text-7xl text-5xl opacity-50 leading-none transition-transform",
                {
                  "rotate-45": addOpen,
                }
              )}
            >
              <Icon type="plus" />
            </div>
            <div className="sm:block hidden uppercase text-xs font-bold leading-none">
              <I18N id="btn.Add" />
            </div>
            {addOpen ? (
              <div className="absolute left-1/2 -bottom-[20px] w-0 h-0 border-[21px] -ml-[21px] border-transparent border-b-white animate-fadedown" />
            ) : null}
          </button>
        ) : null}
      </div>
      {addOpen && wantsToAdd.length && canIwant ? (
        <div
          className="bg-white mt-5 sm:p-4 p-3 shadow-xl rounded-xl relative z-10 animate-fadedown"
          ref={addPadRef}
        >
          <div className="flex flex-wrap sm:gap-5 gap-3">
            {wantsToAdd.map((wantGroup) => {
              return (
                <WantGroupVisual2
                  key={wantGroup.id}
                  wantGroup={wantGroup}
                  toAdd
                  itemId={itemId}
                />
              );
            })}
          </div>
          <button
            className="sm:block hidden absolute bg-gray-800 text-white -top-3 -right-3 w-6 h-6 rounded-full hover:bg-gray-400 transition-colors"
            onClick={toggleAddOpen}
          >
            <Icon />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default WantListVisual2;
