"use client";
import Button from "@/components/button";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import type { BulkKind } from "./BulkSelectProvider";

type Props = {
  isOpen: boolean;
  kind: BulkKind;
  count: number;
  // How many of the selected targets are in the user's wants.
  wantedCount?: number;
  onCancel: () => void;
  onConfirm: () => void;
};

// Same composition as ConfirmModal, with the count and the wants note.
const BulkConfirmModal = ({
  isOpen,
  kind,
  count,
  wantedCount = 0,
  onCancel,
  onConfirm,
}: Props) => {
  const plural = count === 1 ? "one" : "many";

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onCancel}>
      <div className="text-center">
        <h3 className="text-xl mb-2 font-bold">
          <I18N id={`ban.bulk.confirm.title.${kind}.${plural}`} values={[count]} />
        </h3>
        <p className="text-sm text-gray-700 text-balance">
          <I18N id={`ban.bulk.confirm.text.${kind}.${plural}`} />
        </p>
        {wantedCount > 0 ? (
          <p className="mt-3 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 text-balance">
            <I18N
              id={`ban.bulk.confirm.wanted.${wantedCount === 1 ? "one" : "many"}`}
              values={[wantedCount]}
            />
          </p>
        ) : null}
        <div className="flex items-center justify-center gap-3 pt-4">
          <Button type="button" color="cancel" outline onClick={onCancel}>
            <I18N id="ban.bulk.confirm.cancel" />
          </Button>
          <Button
            type="button"
            color="danger"
            className="px-6"
            onClick={onConfirm}
          >
            <I18N id="ban.bulk.confirm.yes" values={[count]} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BulkConfirmModal;
