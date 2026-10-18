import useView from "./useView";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import Chip from "@/components/chip";
import ButtonAlert from "@/components/buttonAlert";
import InnerButton from "@/components/button/inner-button";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import { useReferrerView } from "@/context/referrerView";

const Caption = ({ id, values = [] }: { id: string; values?: number[] }) => (
  <span className="block text-caption text-gray-600 mb-1">
    <I18N id={id} values={values} />
  </span>
);

const BoxView = ({ box }: { box: any }) => {
  const { readOnly } = useReferrerView();
  const {
    editBox,
    deleteBox,
    loading,
    error,
    number,
    destinyName,
    math_items_full,
    comment,
  } = useView(box);

  // The backend only deletes an open, empty box (409 otherwise), so the button
  // is only offered when it can work; otherwise a hint says why.
  const closed = Boolean(box.closed_at);
  const hasItems = math_items_full.length > 0;
  const canDelete = !closed && !hasItems;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <Caption id="boxesDelivery.number" />
            <strong className="block text-heading text-gray-900">{number}</strong>
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
        ) : null}
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
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="min-h-9 px-5 text-body font-bold text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
              onClick={editBox}
            >
              <I18N id="boxesDelivery.btn.edit" />
            </button>
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
          {!canDelete ? (
            <p className="text-caption text-gray-600">
              <I18N
                id={
                  closed
                    ? "boxesDelivery.deleteHint.closed"
                    : "boxesDelivery.deleteHint.items"
                }
              />
            </p>
          ) : null}
        </div>
      )}
      <ErrorAlert error={error} />
      <LoadingBox loading={loading} transparent />
    </div>
  );
};
export default BoxView;
