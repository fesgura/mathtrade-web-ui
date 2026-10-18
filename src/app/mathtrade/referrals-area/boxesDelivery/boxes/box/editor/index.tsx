import {
  Form,
  InputContainer,
  Label,
  Select,
  Textarea,
} from "@/components/form";
import I18N from "@/i18n";
import useEditor from "./useEditor";
import clsx from "clsx";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import { maxCharacters, charactersDanger } from "@/config/maxCharacters";

const BoxEditor = ({ box }) => {
  const {
    validations,
    onSubmit,
    onCancel,
    loading,
    error,
    //
    locationOptions,
    locationId,
    setLocationId,
    id,
    number,
    math_items,
    itemOptions,
    itemCount,
    setItemCount,
    comment,
    setComment,
  } = useEditor(box);

  return (
    <Form validations={validations} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
          <div>
            <span className="block text-caption text-gray-600 mb-1">
              <I18N id="boxesDelivery.number" />
            </span>
            <strong className="block text-heading text-gray-900">
              {id && (box.displayNumber || box.number) ? (
                box.displayNumber || box.number
              ) : (
                <I18N id="boxesDelivery.number.open" />
              )}
            </strong>
            <input type="hidden" name="number" value={number} />
          </div>
          <InputContainer validate="destiny">
            <Label text="boxesDelivery.city" name="destiny" size="sm" required />
            <Select
              data={{ destiny: locationId }}
              name="destiny"
              options={locationOptions}
              icon="location"
              size="sm"
              onChange={(newLocationId) => {
                setLocationId(newLocationId);
              }}
            />
          </InputContainer>
        </div>

        <InputContainer validate="math_items">
          <Label
            text="boxesDelivery.items"
            name="math_items"
            values={[itemCount]}
            size="sm"
          />

          {itemOptions.length > 0 ? (
            <Select
              data={{ math_items }}
              name="math_items"
              options={itemOptions}
              multiple
              onChange={(a) => {
                const next = String(a || "")
                  .split(",")
                  .filter((value) => value.trim() !== "");
                setItemCount(next.length);
              }}
              customRenderTag={(item, deleteBtn) => {
                return (
                  <div
                    className="flex items-center justify-between gap-2 w-full bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 text-body text-gray-900"
                    key={item.value}
                  >
                    <div className="">{item.text}</div>
                    <div className="text-red-600">{deleteBtn}</div>
                  </div>
                );
              }}
              customRenderOption={(op) => {
                return (
                  <div className="py-2" key={op.value}>
                    {op.text}
                  </div>
                );
              }}
            />
          ) : (
            <div className="bg-white rounded-md border border-gray-200 p-2"></div>
          )}
        </InputContainer>
        <InputContainer>
          <div className="flex items-center gap-2">
            <Label text="boxesDelivery.comment" name="comment" size="sm" />
            <span
              className={clsx("text-caption", {
                "text-gray-500":
                  maxCharacters - comment.length > charactersDanger,
                "text-danger font-bold":
                  maxCharacters - comment.length <= charactersDanger,
              })}
            >
              ({` ${comment.length} / ${maxCharacters} `}
              <I18N id="itemComments.editor.label.add.adv" /> )
            </span>
          </div>
          <Textarea
            data={{ comment }}
            name="comment"
            onChange={({ target }) => {
              setComment(target.value);
            }}
            className="h-24"
            size="sm"
            maxlength={maxCharacters}
          />
        </InputContainer>
        <ErrorAlert error={error} />
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            className="w-full sm:w-auto min-h-10 px-6 text-body font-bold text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onCancel}
          >
            <I18N id="btn.Cancel" />
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto min-h-10 px-6 text-body font-bold text-white bg-primary rounded-full hover:opacity-90 transition-opacity"
          >
            <I18N id={`boxesDelivery.btn.${id ? "update" : "create"}`} />
          </button>
        </div>
      </div>
      <LoadingBox loading={loading} transparent />
    </Form>
  );
};
export default BoxEditor;
