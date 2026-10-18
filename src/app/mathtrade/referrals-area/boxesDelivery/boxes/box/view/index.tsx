import useView from "./useView";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import Chip from "@/components/chip";
import Button from "@/components/button";
import ButtonAlert from "@/components/buttonAlert";
import InnerButton from "@/components/button/inner-button";
import Modal from "@/components/modal";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import { useReferrerView } from "@/context/referrerView";

const Caption = ({ id, values = [] }: { id: string; values?: Array<string | number> }) => (
  <span className="block text-caption text-gray-600 mb-1">
    <I18N id={id} values={values} />
  </span>
);

const BoxView = ({ box }: { box: any }) => {
  const { readOnly } = useReferrerView();
  const {
    editBox,
    deleteBox,
    closeBox,
    loading,
    error,
    destinyName,
    math_items_full,
    comment,
    closedNumber,
    dismissClosed,
  } = useView(box);

  const closed = Boolean(box.closed_at);
  const hasItems = math_items_full.length > 0;
  const canDelete = !closed && !hasItems;
  const canClose = !closed && hasItems;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <Caption id="boxesDelivery.number" />
            <strong className="block text-heading text-gray-900">
              {box.displayNumber || box.number ? (
                box.displayNumber || box.number
              ) : (
                <I18N id="boxesDelivery.number.open" />
              )}
            </strong>
          </div>
          <div>
            <Caption id="boxesDelivery.city" />
            <strong className="block text-body-lg text-gray-900">
              {destinyName}
            </strong>
          </div>
        </div>
        {closed ? (
          <Chip tone="done">
            <I18N id="boxesDelivery.closed" />
          </Chip>
        ) : (
          <Chip tone="used">
            <I18N id="boxesDelivery.open" />
          </Chip>
        )}
      </div>

      <div>
        <Caption id="boxesDelivery.items" values={[math_items_full.length]} />
        {hasItems ? (
          <ul className="flex flex-col gap-1.5">
            {math_items_full.map(({ id, text }: { id: string; text: string }) => (
              <li
                key={id}
                className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-body text-gray-900"
              >
                {text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-body text-gray-600">
            <I18N id="boxesDelivery.items.none" />
          </p>
        )}
      </div>

      {comment ? <p className="text-body text-gray-700">{comment}</p> : null}

      {!readOnly && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {!closed ? (
              <button
                type="button"
                className="min-h-9 px-5 text-body font-bold text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                onClick={editBox}
              >
                <I18N id="boxesDelivery.btn.edit" />
              </button>
            ) : (
              <span />
            )}
            {canDelete ? (
              <ButtonAlert
                className="min-h-9 px-2 text-body font-semibold flex items-center gap-1 text-red-600 hover:underline"
                onClick={deleteBox}
                title="boxesDelivery.btn.deleteBoxTitle"
              >
                <InnerButton>
                  <Icon type="trash" />
                  <I18N id="boxesDelivery.btn.delete" />
                </InnerButton>
              </ButtonAlert>
            ) : null}
          </div>
          {canClose ? (
            <button
              type="button"
              className="w-full min-h-10 text-body font-bold text-white bg-primary rounded-full hover:opacity-90 transition-opacity"
              onClick={() => closeBox()}
            >
              <I18N id="boxesDelivery.btn.close" />
            </button>
          ) : null}
          {canClose ? (
            <p className="text-caption text-orange-800">
              <I18N id="boxesDelivery.openHint" />
            </p>
          ) : null}
          {!canDelete && !closed && !canClose ? (
            <p className="text-caption text-gray-600">
              <I18N id="boxesDelivery.deleteHint.items" />
            </p>
          ) : null}
          {closed ? (
            <p className="text-caption text-gray-600">
              <I18N id="boxesDelivery.deleteHint.closed" />
            </p>
          ) : null}
        </div>
      )}
      <ErrorAlert error={error} />
      <LoadingBox loading={loading} transparent />

      <Modal size="sm" isOpen={closedNumber != null} onClose={dismissClosed}>
        <div className="text-center px-2">
          <h3 className="text-heading mb-3">
            <I18N id="boxesDelivery.close.title" />
          </h3>
          <p className="text-5xl font-bold text-gray-900 tabular-nums">
            #{closedNumber}
          </p>
          <p className="mt-3 text-body text-gray-700">
            <I18N
              id="boxesDelivery.close.body"
              values={[closedNumber, destinyName]}
            />
          </p>
          <div className="mt-6">
            <Button type="button" onClick={dismissClosed}>
              <I18N id="boxesDelivery.close.done" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default BoxView;
