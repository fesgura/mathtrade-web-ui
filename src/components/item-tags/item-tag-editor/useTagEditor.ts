import { useContext, useCallback, useEffect, useRef, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import useLoadAllMyWants from "@/hooks/useLoadAllMyWants";
import { useOptions } from "@/store";
import { getRandomColor } from "@/utils/color";

const useTagEditor = (
  tag: any = null,
  onClose: () => void = () => {},
  initialItemIds: (number | string)[] = []
) => {
  /* PAGE CONTEXT **********************************************/
  const { setItemTags, myWants, setMyWants, setMustConfirm } =
    useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* MY WANTS **********************************************/
  // Creating a tag over wanted copies changes the wants (backend), so reload
  // them (every page). A ref, not state: it is set right before the POST and
  // read in its afterLoad, which would otherwise see a stale value.
  const { loadAll: loadAllMyWants } = useLoadAllMyWants();
  const pendingWants = useRef<false | "reload" | "moved">(false);
  /* end MY WANTS **********************************************/

  /* FILTERS **********************************************/
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTERS **********************************************/

  /* INPUT REF **********************************************/
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  /* end INPUT REF **********************************************/

  /* FORM *********************************** */
  const [name, setName] = useState(tag?.name || "");
  const [color, setColor] = useState(tag?.color || getRandomColor());
  // The tag's want: at most one game of the whole tag (default) or several.
  const [dupProtection, setDupProtection] = useState(
    tag?.dup_protection ?? true
  );
  /* end FORM *********************************** */

  /* ITEM TAGS *********************************************/
  const afterLoadItemTags = useCallback(
    ({ results }: { results: any[] }) => {
      const tags = results.map((tag: any, i: number) => {
        return {
          ...tag,
          id: `${tag?.id || i}`,
          itemsComplete: tag.items,
          items: tag.items.map(({ id }: { id: number }) => id),
        };
      });
      setItemTags(tags);
      onClose();
    },
    [setItemTags, onClose]
  );

  const [loadMyTags, , loadingMyTags] = useFetch({
    endpoint: "MYTAGS",
    initialState: { results: [] },
    afterLoad: afterLoadItemTags,
  });
  /* end ITEM TAGS *********************************************/

  /* PUT TAG ************************************************/
  const afterLoadPutMyItemTag = useCallback(() => {
    // My own tags are inherently bounded to one user's own entries - request
    // the max page size so they aren't silently truncated at the default (50).
    loadMyTags({ params: { page_size: 200 } });
  }, [loadMyTags]);

  const [putMyItemTag, , loadingPut, errorPut] = useFetch({
    endpoint: "PUT_MYTAGS",
    method: "PUT",
    afterLoad: afterLoadPutMyItemTag,
  });
  /* end PUT TAG ************************************************/

  /* POST TAG ************************************************/
  const afterLoadPostMyItemTag = useCallback(() => {
    loadMyTags({ params: { page_size: 200 } });
    const pending = pendingWants.current;
    pendingWants.current = false;
    if (pending) {
      // Also bumps wantsVersion, so the duplicates banner refetches.
      if (pending === "moved") setMustConfirm(true);
      // useFetch doesn't abort on unmount: this lands after onClose().
      loadAllMyWants().then((wants) => {
        if (wants) setMyWants(wants);
      });
    }
  }, [loadMyTags, setMustConfirm, loadAllMyWants, setMyWants]);

  const [postMyItemTag, , loadingPost, errorPost] = useFetch({
    endpoint: "POST_MYTAGS",
    method: "POST",
    afterLoad: afterLoadPostMyItemTag,
  });
  /* end POST TAG ************************************************/

  /* DELETE TAG ************************************************/
  const afterDeletePostMyItemTag = useCallback(() => {
    updateFilters({ tag: undefined }, "item");
    loadMyTags({ params: { page_size: 200 } });
  }, [loadMyTags, updateFilters]);

  const [deleteMyItemTag, , loadingDelete] = useFetch({
    endpoint: "DELETE_MYTAGS",
    method: "DELETE",
    afterLoad: afterDeletePostMyItemTag,
  });
  /* end DELETE TAG ************************************************/

  const onCancel = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (tag) {
        // Never send `items`: the backend then leaves the tag's copies as
        // they are, so a stale client list can't untag any of them.
        putMyItemTag({
          urlParams: [tag.id],
          params: { name, color, dup_protection: dupProtection },
        });
      } else {
        const ids = new Set(initialItemIds.map((i) => `${i}`));
        const touched = (myWants || []).filter((w: any) =>
          (w.wants || []).some((c: any) => ids.has(`${c.id}`))
        );
        // Tagging a copy wanted on its own (a single-item want) moves it into
        // the tag's want (backend), so the member has to commit again.
        pendingWants.current = !touched.length
          ? false
          : touched.some(
                (w: any) => w.type === "item" && (w.wants || []).length === 1
              )
            ? "moved"
            : "reload";
        postMyItemTag({
          params: {
            name,
            color,
            items: initialItemIds,
            dup_protection: dupProtection,
          },
        });
      }
    },
    [
      tag,
      name,
      color,
      dupProtection,
      putMyItemTag,
      postMyItemTag,
      initialItemIds,
      myWants,
    ]
  );

  const onDelete = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const { id } = tag;
      deleteMyItemTag({
        urlParams: [id],
      });
    },
    [tag, deleteMyItemTag]
  );

  return {
    inputRef,
    name,
    setName,
    color,
    setColor,
    dupProtection,
    setDupProtection,
    loading: loadingMyTags || loadingPut || loadingPost || loadingDelete,
    error: errorPut || errorPost,
    onCancel,
    onSubmit,
    onDelete,
  };
};

export default useTagEditor;
