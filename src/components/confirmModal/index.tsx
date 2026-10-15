import Button from "@/components/button";
import Modal from "@/components/modal";
import I18N from "@/i18n";

type ConfirmModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  titleValues?: any[];
  description?: string;
  descriptionValues?: any[];
  cancelId?: string;
  confirmId?: string;
  // "danger" (red, default) for destructive actions; "primary" (brand blue)
  // when confirming something that isn't destructive (e.g. sending a
  // report to the owner).
  variant?: "danger" | "primary";
};

// A controlled "are you sure?" modal, for confirmations that only apply in
// some cases (ButtonAlert always asks).
const ConfirmModal = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  titleValues = [],
  description = "",
  descriptionValues = [],
  cancelId = "btn.Cancel",
  confirmId = "Yes",
  variant = "danger",
}: ConfirmModalProps) => (
  <Modal size="sm" isOpen={isOpen} onClose={onCancel}>
    <div className="text-center">
      <h3 className="text-xl mb-2 font-bold">
        <I18N id={title} values={titleValues} />
      </h3>
      {description ? (
        <p className="text-sm text-gray-700 text-balance">
          <I18N id={description} values={descriptionValues} />
        </p>
      ) : null}
      <div className="flex items-center justify-center gap-3 pt-4">
        <Button type="button" color="cancel" outline onClick={onCancel}>
          <I18N id={cancelId} />
        </Button>
        <Button
          type="button"
          color={variant}
          className="px-6"
          onClick={onConfirm}
        >
          <I18N id={confirmId} />
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;
