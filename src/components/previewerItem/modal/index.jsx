"use client";
import { useCallback, useContext } from "react";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import { MyWantsContext } from "@/context/myWants/all";
import ItemPreview from "./item";

const ModalPreviewerItem = () => {
  const { showPreviewItemModal, tooglePreviewItemModal, previewItemId } =
    useContext(MyWantsContext);

  return (
    <Modal
      isOpen={showPreviewItemModal}
      onClose={tooglePreviewItemModal}
      size="md2"
    >
      {previewItemId ? <ItemPreview id={previewItemId} /> : null}
      <div className="text-center pt-8">
        <button
          className="border border-gray-400 py-2 px-7 rounded-full hover:bg-gray-400 hover:text-white shadow"
          onClick={tooglePreviewItemModal}
        >
          <I18N id="btn.Close" />
        </button>
      </div>
    </Modal>
  );
};

export default ModalPreviewerItem;
