import Modal from "@/components/modal";
import I18N from "@/i18n";
import useMarkReceived from "./useMarkReceived";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";

const ModalReceivedItem = ({ isOpen, onClose, itemData, setReloadData }) => {
  const { loading, error } = useMarkReceived(onClose, setReloadData);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <h2 className="text-center text-balance font-bold text-xl mb-5">
        <I18N id="received.modal.title" values={[itemData?.title || ""]} />
      </h2>
      <ErrorAlert error={error} />
      <div className="flex items-center justify-center gap-3">
        <button
          className="py-2 px-5 border border-gray-400 text-gray-600 rounded-full hover:text-black hover:border-black transition-colors"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          <I18N id="btn.Cancel" />
        </button>
        <button className="py-2 px-5 bg-primary text-white rounded-full transition-colors hover:bg-sky-800">
          <I18N id="received.btn.yes" />
        </button>
      </div>
      <LoadingBox loading={loading} min />
    </Modal>
  );
};

export default ModalReceivedItem;
