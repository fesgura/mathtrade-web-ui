"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "@/context/page";
import Modal from "@/components/modal";
import ItemPreview from "./item";
import GamePreview from "./game";
import TagPreview from "./tag";
import RemoveButton from "./removeBtn";
import useFetch from "@/hooks/useFetch";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import I18N, { getI18Ntext } from "@/i18n";
import type { WantChange } from "@/app/mathtrade/my-wants/useWants";

const ModalPreviewerWantGroup = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    canI,
    showPreviewWantGroupModal,
    tooglePreviewWantGroupModal,
    previewWantGroup,
    setPreviewWantGroup,
    previewWantGroupId,
    setPreviewWantGroupId,
    wantChanges,
    markWantSeen,
  } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* FETCH *************************************************/
  const afterLoad = useCallback(
    (newWantGroup) => {
      setPreviewWantGroup(newWantGroup);
      setPreviewWantGroupId(null);
    },
    [setPreviewWantGroup, setPreviewWantGroupId]
  );
  const [getWantGroup, , loading, error] = useFetch({
    endpoint: "GET_WANT",
    initialState: null,
    afterLoad,
  });

  useEffect(() => {
    if (previewWantGroupId && showPreviewWantGroupModal) {
      setPreviewWantGroup(null);
      getWantGroup({ urlParams: [previewWantGroupId] });
    }
  }, [
    setPreviewWantGroup,
    getWantGroup,
    previewWantGroupId,
    showPreviewWantGroupModal,
  ]);

  /* end FETCH */

  /* WANT CHANGES ******************************************
   * Unread WGD/WGC on this want (Mis deseos highlight). Opening the preview
   * marks them seen once per open; the notice keeps the list until close. */
  const [shownChanges, setShownChanges] = useState<WantChange[]>([]);
  const seenIdRef = useRef<number | null>(null);
  const previewId: number | null = previewWantGroup?.id ?? null;

  useEffect(() => {
    if (!showPreviewWantGroupModal) {
      seenIdRef.current = null;
      setShownChanges([]);
      return;
    }
    if (!previewId || seenIdRef.current === previewId) return;
    seenIdRef.current = previewId;
    const changes: WantChange[] = wantChanges.get(previewId) || [];
    setShownChanges(changes);
    if (changes.length) {
      markWantSeen(previewId);
    }
  }, [showPreviewWantGroupModal, previewId, wantChanges, markWantSeen]);
  /* end WANT CHANGES */

  /*****************************************************/

  let content = null;

  if (previewWantGroup) {
    switch (previewWantGroup?.type) {
      case "item":
        content = <ItemPreview wantGroup={previewWantGroup} />;
        break;
      case "game":
        content = <GamePreview wantGroup={previewWantGroup} />;
        break;
      case "tag":
        content = <TagPreview wantGroup={previewWantGroup} />;
        break;
      default:
      //
    }
  }

  return (
    <Modal
      isOpen={showPreviewWantGroupModal}
      onClose={tooglePreviewWantGroupModal}
      size="md2"
    >
      <div className="relative min-h-60">
        {previewWantGroup && shownChanges.length ? (
          // mr-6: room for the modal's close button.
          <div
            className="mr-6 mb-3 min-w-0 max-w-full rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950 break-words"
            role="status"
          >
            <p className="font-semibold">
              <I18N id="myWants.changed.title" />
            </p>
            <ul className="mt-1 list-disc pl-5">
              {shownChanges.map(({ type, item_name, notification_id }) => (
                <li key={notification_id}>
                  {getI18Ntext(`myWants.changed.${type}`, [item_name])}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {content}
        {previewWantGroup && canI.want ? (
          <RemoveButton wantGroup={previewWantGroup} />
        ) : null}
        <ErrorAlert error={error} />
        <LoadingBox loading={loading} />
      </div>
    </Modal>
  );
};

export default ModalPreviewerWantGroup;
