"use client";
import { useCallback, useContext } from "react";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import { PageContext } from "@/context/page";
import ItemPreview from "./item";

const ModalPreviewer = () => {
  const { itemPreviewId, showModalPreview, setShowModalPreview } =
    useContext(PageContext);

  const onClose = useCallback(() => {
    setShowModalPreview(false);
  }, [setShowModalPreview]);

  return (
    <Modal isOpen={showModalPreview} onClose={onClose} size="md2">
      <ItemPreview id={itemPreviewId} />
      <div className="text-center pt-8">
        <button
          className="border border-gray-400 py-2 px-7 rounded-full hover:bg-gray-400 hover:text-white shadow"
          onClick={onClose}
        >
          <I18N id="btn.Close" />
        </button>
      </div>
    </Modal>
  );
};

export default ModalPreviewer;
