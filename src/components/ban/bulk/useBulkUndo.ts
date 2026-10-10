import { useCallback, useContext, useRef } from "react";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";
import useFetch from "@/hooks/useFetch";
import { getI18Ntext } from "@/i18n";
import useToast from "@/components/toast/useToast";
import type { BulkBanResponse } from "./useBulkIgnore";

type UndoParams = { type: BulkBanResponse["type"]; identities: number[] };

const kindOf = (type: BulkBanResponse["type"]) =>
  type === "G" ? "game" : "item";

// After a bulk ignore: a toast "N juegos ignorados · Deshacer". Deshacer
// sends one POST bans/bulk-delete/ with the same identities, then the same
// refetch as the ignore. If it fails, the toast offers a retry. Returns the
// onIgnored callback for useBulkIgnore.
const useBulkUndo = () => {
  const { forceReloadPage } = useContext(PageContext);
  const updateFilters = useOptions((state) => state.updateFilters);
  const { show } = useToast();
  const sentRef = useRef<UndoParams | null>(null);
  const undoRef = useRef<() => void>(() => {});

  const afterLoad = useCallback(() => {
    if (!sentRef.current) return;
    updateFilters({}, kindOf(sentRef.current.type));
    forceReloadPage();
  }, [updateFilters, forceReloadPage]);

  const afterError = useCallback(() => {
    show({
      text: getI18Ntext("ban.bulk.toast.undoError"),
      actionLabel: getI18Ntext("ban.bulk.toast.retry"),
      onAction: () => undoRef.current(),
    });
  }, [show]);

  const [postBulkDelete] = useFetch({
    endpoint: "POST_BAN_BULK_DELETE",
    method: "POST",
    afterLoad,
    afterError,
  });

  return useCallback(
    (res: BulkBanResponse, identities: number[]) => {
      if (!res.created || !identities.length) return;
      const params: UndoParams = { type: res.type, identities };
      const undo = () => {
        sentRef.current = params;
        postBulkDelete({ params });
      };
      undoRef.current = undo;
      show({
        text: getI18Ntext(
          `ban.bulk.toast.${kindOf(res.type)}.${res.created === 1 ? "one" : "many"}`,
          [res.created]
        ),
        actionLabel: getI18Ntext("ban.bulk.toast.undo"),
        onAction: undo,
      });
    },
    [postBulkDelete, show]
  );
};

export default useBulkUndo;
