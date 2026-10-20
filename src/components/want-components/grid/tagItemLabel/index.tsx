"use client";
import { useCallback, useContext } from "react";
import clsx from "clsx";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import I18N, { getI18Ntext } from "@/i18n";
import PreviewerItem from "@/components/previewerItem";
import { replaceWant } from "@/utils/replaceWant";

/* Info row of an item under an expanded tag in the wants grid. The ticks
 * live on the tag row; this row says whether the item is wanted and lets
 * you want it (add it to the tag) or stop wanting it, right here. */
const TagItemLabel = ({ row }: { row: any }) => {
  const { item, color, wanted, wantedElsewhere, tagId } = row;
  const { setMyWants, setMustConfirm, canI } = useContext(PageContext);

  // The backend returns the updated tag want (full data): swap it in.
  // Wanting changes the commitment, same as any other want edit.
  const afterLoad = useCallback(
    (updated: any) => {
      setMustConfirm(true);
      setMyWants((wants: any[]) => replaceWant(wants, updated));
    },
    [setMyWants, setMustConfirm]
  );

  const [add, , adding, errorAdd] = useFetch({
    endpoint: "POST_TAG_CONSOLIDATE",
    method: "POST",
    afterLoad,
  });
  const [remove, , removing, errorRemove] = useFetch({
    endpoint: "POST_TAG_UNCONSOLIDATE",
    method: "POST",
    afterLoad,
  });
  const busy = adding || removing;
  const params = { urlParams: [tagId], params: { item_id: item.id } };

  let state = "none";
  if (wanted) state = "wanted";
  else if (wantedElsewhere) state = "elsewhere";

  return (
    <div
      className={clsx(
        "h-7 w-52 sm:w-80 lg:w-[32rem] border-b border-r border-gray-200 flex items-center justify-between gap-1 pl-6 pr-1",
        { "opacity-70": state === "none" }
      )}
      style={{ backgroundColor: state === "wanted" ? `${color}25` : "#f3f4f6" }}
      title={getI18Ntext(`grid.tagItem.${state}`)}
    >
      <h5 className="cropped_1 min-w-0 flex-1 text-[11px]" title={item.title}>
        {item.title}
      </h5>
      <div className="flex items-center gap-1 shrink-0">
        {errorAdd || errorRemove ? (
          <span className="text-[10px] text-red-600">!</span>
        ) : null}
        {state === "elsewhere" ? (
          <span className="text-[10px] text-gray-600 whitespace-nowrap">
            <I18N id="grid.tagItem.elsewhereShort" />
          </span>
        ) : canI?.want && item.contains_offered && state !== "wanted" ? (
          <span
            className="text-[10px] text-gray-600 whitespace-nowrap"
            title={getI18Ntext("want.skipOfferedCombo")}
          >
            <I18N id="want.skipOfferedComboShort" />
          </span>
        ) : canI?.want ? (
          <button
            type="button"
            disabled={busy}
            className={clsx(
              "text-[10px] font-semibold rounded-full px-2 py-[1px] whitespace-nowrap",
              state === "wanted"
                ? "border border-gray-400 text-gray-600"
                : "bg-want text-white"
            )}
            onClick={() => (state === "wanted" ? remove(params) : add(params))}
          >
            <I18N id={state === "wanted" ? "grid.tagItem.remove" : "grid.tagItem.add"} />
          </button>
        ) : null}
        <div className="w-6">
          <PreviewerItem itemId={item.id} className="" />
        </div>
      </div>
    </div>
  );
};

export default TagItemLabel;
