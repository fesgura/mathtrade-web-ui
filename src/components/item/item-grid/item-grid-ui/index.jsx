import clsx from "clsx";
import useItemGrid from "./useItemGrid";
import ItemMD from "./md";
import ItemXL from "./xl";

const ItemGridUI = ({ expanded, setExpanded }) => {
  const { itemNode, isExpanded, onToggleExpanse } = useItemGrid(
    expanded,
    setExpanded
  );

  return (
    <article
      className={clsx("transition-[padding_0.2s]", {
        "col-span-full  pt-[100px]": isExpanded,
      })}
      ref={itemNode}
    >
      <div
        className={clsx(
          "transition-all relative mx-auto bg-item-200 rounded-md border border-item-300",
          {
            "w-[230px] h-full hover:shadow-[0_2px_16px_rgba(0,0,0,0.3)] shadow-[0_1px_8px_rgba(0,0,0,0.3)] ":
              !isExpanded,
            "shadow-xl w-full duration-700 max-w-5xl": isExpanded,
          }
        )}
      >
        {!isExpanded ? (
          <ItemMD onToggleExpanse={onToggleExpanse} />
        ) : (
          <ItemXL onToggleExpanse={onToggleExpanse} />
        )}
      </div>
    </article>
  );
};
export default ItemGridUI;
