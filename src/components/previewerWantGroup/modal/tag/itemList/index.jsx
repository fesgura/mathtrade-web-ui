import { useContext } from "react";
import { PageContext } from "@/context/page";
import ItemOfTag from "./itemOfTag";
import I18N from "@/i18n";
import Question from "@/components/question";
import clsx from "clsx";

const ItemList = ({
  items,
  dup_protection,
  setDup_protection,
  itemIdsSelected,
  setItemIdsSelected,
}) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  return (
    <div>
      <div className="sm:flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
        <h3 className="font-bold">
          <I18N id="title.ItemList" />
        </h3>
        <div>
          <label
            className={clsx("flex items-center gap-2", {
              "cursor-pointer": canI.want,
              "cursor-not-allowed": !canI.want,
            })}
          >
            <div className="pt-1">
              <input
                type="checkbox"
                checked={dup_protection}
                className={!canI.want ? "cursor-not-allowed" : "cursor-pointer"}
                disabled={!canI.want}
                onChange={({ target }) => {
                  setDup_protection(target.checked);
                }}
              />
            </div>
            <div>
              <span className="text-xs">
                <I18N
                  id={`MyWants.dup_protection.${dup_protection ? "yes" : "no"}`}
                />
              </span>
              {canI.want ? (
                <Question text="MyWants.dup_protection.help" />
              ) : null}
            </div>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          return (
            <ItemOfTag
              key={item.id}
              item={item}
              itemIdsSelected={itemIdsSelected}
              setItemIdsSelected={setItemIdsSelected}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ItemList;
