import Modal from "@/components/modal";
import useConfirmChanges from "./useConfirmChanges";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const ConfirmChangesModal = ({ isOpen, onClose }) => {
  const { onCommitChanges, loading, error } = useConfirmChanges(onClose);

  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <h2 className="text-center text-xl font-bold text-balance mb-4 pb-4 border-b border-gray-300">
        <I18N id="confirm.modal.title" />
      </h2>
      <p className="mb-3">
        <I18N id="confirm.modal.p1" />
      </p>
      <p className="mb-3 text-sm italic">
        <I18N id="confirm.modal.p2" />
      </p>
      <p className="mb-3">
        <I18N id="confirm.modal.p3" />
      </p>
      <p className="mb-4">
        <I18N id="confirm.modal.p4" />
      </p>
      <div className="border-t border-gray-300 pt-4">
        <ErrorAlert error={error} />
        <div className="flex items-center justify-center gap-3">
          <button
            className="border border-gray-400 text-lg py-2 px-7 rounded-full hover:bg-gray-400 hover:text-white shadow"
            onClick={onClose}
          >
            <I18N id="btn.Cancel" />
          </button>
          <button
            className="text-lg py-2 px-7 rounded-full bg-danger text-white hover:bg-red-800 shadow font-bold"
            onClick={onCommitChanges}
          >
            <I18N id="confirm.modal.btn" />
          </button>
        </div>
      </div>
      <LoadingBox loading={loading} />
    </Modal>
  );
};
export default ConfirmChangesModal;
