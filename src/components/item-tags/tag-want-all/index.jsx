"use client";
import { useCallback, useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { TagContext } from "@/context/tag";
import useFetch from "@/hooks/useFetch";
import ButtonAlert from "@/components/buttonAlert";
import { replaceWant } from "@/utils/replaceWant";
import I18N from "@/i18n";

/* Tag header: a tag is a want, and each game in it is wanted only when you
 * say so. This block states how many are wanted and offers explicit,
 * confirmed "all" / "none" actions (replacing the generic want button,
 * whose "remove" would have deleted the tag's want). */
const TagWantAll = () => {
  const { myWants, setMyWants, setMustConfirm, canI } = useContext(PageContext);
  const { tag } = useContext(TagContext);

  const tagWant = useMemo(
    () =>
      (myWants || []).find(
        (w) => w.type === "tag" && `${w.tag?.id ?? w.tag}` === `${tag?.id}`
      ) || null,
    [myWants, tag]
  );
  const total = tag?.items?.length || 0;
  const wanted = tagWant?.wants?.length || 0;

  // The backend returns the updated tag want (full data): swap it in.
  const afterLoad = useCallback(
    (updated) => {
      setMustConfirm(true);
      setMyWants((wants) => replaceWant(wants, updated));
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

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-gray-700">
        <I18N id="tagWantAll.status" values={[wanted, total]} />
      </span>
      {wanted < total ? (
        <ButtonAlert
          className="rounded-full bg-want text-white font-semibold px-3 py-1 hover:opacity-90"
          title="tagWantAll.allTitle"
          description="tagWantAll.allHelp"
          disabled={loading}
          onClick={() => wantAll(params)}
        >
          <I18N id="tagWantAll.all" values={[total]} />
        </ButtonAlert>
      ) : null}
      {wanted > 0 ? (
        <ButtonAlert
          className="rounded-full border border-gray-300 text-gray-600 font-semibold px-3 py-1 hover:opacity-75"
          title="tagWantAll.noneTitle"
          description="tagWantAll.noneHelp"
          disabled={loading}
          onClick={() => wantNone(params)}
        >
          <I18N id="tagWantAll.none" />
        </ButtonAlert>
      ) : null}
    </div>
  );
};

export default TagWantAll;
