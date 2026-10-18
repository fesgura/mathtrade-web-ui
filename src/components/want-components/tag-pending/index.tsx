"use client";
import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import ButtonAlert from "@/components/buttonAlert";
import { replaceWant } from "@/utils/replaceWant";
import I18N, { getI18Ntext } from "@/i18n";
import { isEmptyWantGroup, tagPendingCount } from "../utils";

/* A tag's games only count once you want them. Games added to a tag after
 * you wanted others (or to a tag with none wanted) sit in `availables` and
 * look just like the wanted ones, so this says how many aren't wanted and
 * offers the confirmed "want them all" action (the same endpoint as the tag
 * header's "Quiero todos").
 *   chip:  a compact amber button for the grid's tag row.
 *   block: a notice + button under the tag card in the visual view. */
const TagPendingWants = ({
  wantGroup = null,
  variant = "block",
}: {
  wantGroup?: any;
  variant?: "chip" | "block";
}) => {
  const { setMyWants, canI } = useContext(PageContext);
  const pending = tagPendingCount(wantGroup);
  const tagId = wantGroup?.tag?.id;

  // The backend returns the updated tag want (full data): swap it in.
  const afterLoad = useCallback(
    (updated: any) => setMyWants((wants: any[]) => replaceWant(wants, updated)),
    [setMyWants],
  );

  const [wantAll, , loading, error] = useFetch({
    endpoint: "POST_TAG_CONSOLIDATE",
    method: "POST",
    afterLoad,
  });

  if (!pending || !tagId || !canI?.want) return null;

  const onConfirm = () =>
    wantAll({ urlParams: [tagId], params: { all: true } });

  const errorText = error ? (
    <span className="text-[10px] text-red-600">
      <I18N id="tagWant.error" />
    </span>
  ) : null;

  if (variant === "chip") {
    return (
      <>
        <ButtonAlert
          className="text-[10px] font-semibold rounded-full px-1.5 py-[1px] whitespace-nowrap shrink-0 bg-amber-400 text-amber-950 hover:opacity-90 disabled:opacity-50"
          title="tagPending.confirmTitle"
          description="tagPending.confirmHelp"
          disabled={loading}
          onClick={onConfirm}
        >
          <span title={getI18Ntext("tagPending.chipTitle")}>
            <I18N id="tagPending.chip" values={[pending]} />
          </span>
        </ButtonAlert>
        {errorText}
      </>
    );
  }

  const noneWanted = isEmptyWantGroup(wantGroup);

  return (
    <div className="mt-2 w-full sm:w-52 max-w-full rounded-lg border border-amber-300 bg-amber-50 text-amber-950 p-2 text-[11px] leading-snug flex flex-col items-start gap-1.5">
      <p>
        <I18N
          id={noneWanted ? "tagPending.emptyNotice" : "tagPending.someNotice"}
          values={noneWanted ? [] : [pending]}
        />
      </p>
      <ButtonAlert
        className="rounded-full bg-want text-white font-semibold px-2.5 py-0.5 hover:opacity-90 disabled:opacity-50"
        title="tagPending.confirmTitle"
        description="tagPending.confirmHelp"
        disabled={loading}
        onClick={onConfirm}
      >
        <I18N id="tagPending.btn" values={[pending]} />
      </ButtonAlert>
      {errorText}
    </div>
  );
};

export default TagPendingWants;
