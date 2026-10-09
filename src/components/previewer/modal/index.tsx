"use client";
import { useCallback, useContext } from "react";
import { FloatingPortal } from "@floating-ui/react";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import { PageContext } from "@/context/page";
import ItemPreview from "./item";

const ModalPreviewer = () => {
  const {
    itemPreviewId,
    customMathtradeId,
    setCustomMathtradeId,
    showModalPreview,
    setShowModalPreview,
  } = useContext(PageContext);

  const onClose = useCallback(() => {
    setCustomMathtradeId(null);
    setShowModalPreview(false);
  }, [setCustomMathtradeId, setShowModalPreview]);

  /* Portaled, and mounted only while open, so it stacks above whatever opened
   * it last, including the admin user modal (itself portaled). The key
   * re-appends it when another item is previewed from a modal opened on top. */
  return showModalPreview ? (
    <FloatingPortal key={itemPreviewId}>
      <Modal isOpen onClose={onClose} size="md2">
        <ItemPreview id={itemPreviewId} customMathtradeId={customMathtradeId} />
        <div className="text-center pt-8">
          <button
            className="border border-gray-400 py-2 px-7 rounded-full hover:bg-gray-400 hover:text-white shadow"
            onClick={onClose}
          >
            <I18N id="btn.Close" />
          </button>
        </div>
      </Modal>
    </FloatingPortal>
  ) : null;
};

export default ModalPreviewer;
