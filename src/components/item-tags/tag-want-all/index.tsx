"use client";
import { useCallback, useContext, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import { TagContext } from "@/context/tag";
import useFetch from "@/hooks/useFetch";
import ConfirmModal from "@/components/confirmModal";
import DupCountNote from "@/components/want-components/tag-pending/dupCountNote";
import { replaceWant } from "@/utils/replaceWant";
import { duplicateRuleForCopies } from "@/utils/duplicateWants";
import I18N from "@/i18n";
import { visibleTagItems } from "@/utils/tagItems";

/* Tag header: a tag is a want, and each game in it is wanted only when you
 * say so. This block states how many are wanted and offers explicit,
 * confirmed "all" / "none" actions (replacing the generic want button,
 * whose "remove" would have deleted the tag's want). "All" also says how many
 * of the copies would duplicate another want. */
const TagWantAll = () => {
  const { myWants, setMyWants, setMustConfirm, canI } = useContext(PageContext);
  const { tag } = useContext(TagContext);
  const [confirm, setConfirm] = useState<null | {
    kind: "all" | "none";
    dupCount: number;
  }>(null);

  const tagWant = useMemo(
    () =>
      (myWants || []).find(
        (w: any) => w.type === "tag" && `${w.tag?.id ?? w.tag}` === `${tag?.id}`
      ) || null,
    [myWants, tag]
  );
  // Ignored copies can't be wanted ("all" skips them): not in the total.
  const total = visibleTagItems(tag?.itemsComplete).length;
  const wanted = tagWant?.wants?.length || 0;

  // The backend returns the updated tag want (full data): swap it in.
  const afterLoad = useCallback(
    (updated: any) => {
      setMustConfirm(true);
      setMyWants((wants: any[]) => replaceWant(wants, updated));
    },
    [setMyWants, setMustConfirm]
  );

  const [wantAll, , loadingAll] = useFetch({
    endpoint: "POST_TAG_CONSOLIDATE",
    method: "POST",
    afterLoad,
  });
  const [wantNone, , loadingNone] = useFetch({
    endpoint: "POST_TAG_UNCONSOLIDATE",
    method: "POST",
    afterLoad,
  });

  if (!tag || !total || !canI?.want) return null;
  const loading = loadingAll || loadingNone;
  const params = { urlParams: [tag.id], params: { all: true } };
  const isAll = confirm?.kind === "all";

  // Counted on click (not memoized over myWants): only the copies this
  // action would want, i.e. the pending ones minus combos with an offered game.
  const onAll = () => {
    const candidates = (tagWant?.availables || []).filter(
      (c: any) => !c.contains_offered
    );
    const dupCount = duplicateRuleForCopies(
      myWants || [],
      tagWant?.id ?? null,
      candidates
    ).size;
    setConfirm({ kind: "all", dupCount });
  };

  const onConfirm = () => {
    const kind = confirm?.kind;
    setConfirm(null);
    if (kind === "all") wantAll(params);
    else if (kind === "none") wantNone(params);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-gray-700">
        <I18N id="tagWantAll.status" values={[wanted, total]} />
      </span>
      {wanted < total ? (
        <button
          type="button"
          className="rounded-full bg-want text-white font-semibold px-3 py-1 hover:opacity-90"
          disabled={loading}
          onClick={onAll}
        >
          <I18N id="tagWantAll.all" values={[total]} />
        </button>
      ) : null}
      {wanted > 0 ? (
        <button
          type="button"
          className="rounded-full border border-gray-300 text-gray-600 font-semibold px-3 py-1 hover:opacity-75"
          disabled={loading}
          onClick={() => setConfirm({ kind: "none", dupCount: 0 })}
        >
          <I18N id="tagWantAll.none" />
        </button>
      ) : null}
      <ConfirmModal
        isOpen={!!confirm}
        onCancel={() => setConfirm(null)}
        onConfirm={onConfirm}
        title={isAll ? "tagWantAll.allTitle" : "tagWantAll.noneTitle"}
        description={isAll ? "tagWantAll.allHelp" : "tagWantAll.noneHelp"}
        cancelId="btn.Cancel"
        confirmId="Yes"
        variant="danger"
      >
        <DupCountNote count={confirm?.dupCount || 0} />
      </ConfirmModal>
    </div>
  );
};

export default TagWantAll;
