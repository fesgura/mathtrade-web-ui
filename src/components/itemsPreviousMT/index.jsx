import { useContext, useCallback } from "react";
import { ItemPreviousMTContext } from "@/context/itemPreviousMT";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import ItemList from "./itemList";

const ModalComp = () => {
  const { onClose, openModal } = useContext(ItemPreviousMTContext);

  return (
    <Modal isOpen={openModal} onClose={onClose} size="md2">
      <ItemList />
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

const ItemsPreviousMT = () => {
  const { mathTradePrevious } = useContext(ItemPreviousMTContext);
  return mathTradePrevious ? <ModalComp /> : null;
};

export default ItemsPreviousMT;
