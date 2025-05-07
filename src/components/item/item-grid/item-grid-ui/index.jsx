import clsx from "clsx";
import useItemGrid from "./useItemGrid";
import ItemMD from "./md";
import ItemXL from "./xl";

const ItemGridUI = ({ expanded, setExpanded }) => {
  const { itemNode, isExpanded, isCombo, onToggleExpanse } = useItemGrid(
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
        className={clsx("transition-all relative mx-auto border", {
          "w-[230px] h-full shadow-md hover:shadow-[0_3px_16px_rgba(0,0,0,0.25)] rounded-lg":
            !isExpanded,
          "shadow-xl w-full duration-700 max-w-5xl": isExpanded,
          "bg-item-200 border-item-300": !isCombo,
          "bg-item-300 border-item-400": isCombo,
        })}
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
