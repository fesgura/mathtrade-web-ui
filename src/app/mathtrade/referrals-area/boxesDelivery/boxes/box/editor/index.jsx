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
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-5">
          <div className="w-24">
            <Label text="boxesDelivery.number" name="number" />
            <div className="bg-white/20 border border-gray-400/70 text-xl font-bold py-1 rounded-md text-center px-3">
              {number}
              <input type="hidden" name="number" value={number} />
            </div>
          </div>
          <InputContainer validate="destiny">
            <Label text="boxesDelivery.city" name="destiny" required />
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
            required
          />

          {itemOptions.length > 0 ? (
            <Select
              data={{ math_items }}
              name="math_items"
              options={itemOptions}
              multiple
              onChange={(a) => {
                setItemCount(a.split(",").length);
              }}
              customRenderTag={(item, deleteBtn) => {
                return (
                  <div
                    className="flex items-center justify-between gap-2 w-full bg-sky-100 border border-sky-400 font-bold rounded px-2  py-1 text-sm"
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
            <div className="bg-white rounded-md border border-gray-400 p-2"></div>
          )}
        </InputContainer>
        <InputContainer>
          <div className="flex items-center gap-2">
            <Label text="boxesDelivery.comment" name="comment" />
            <span
              className={clsx("text-xs", {
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
        <div
          className={clsx("flex items-end gap-4", {
            "justify-center": !id,
            "justify-between": id,
          })}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-gray-500 border border-gray-400  font-bold text-lg px-8 py-2 rounded-full  hover:text-white hover:bg-gray-500 transition-colors"
              onClick={onCancel}
            >
              <I18N id="btn.Cancel" />
            </button>
            <button
              type="submit"
              className={clsx(
                "text-white  font-bold text-lg px-8 py-2 rounded-full  hover:text-white transition-colors",
                {
                  "bg-primary hover:bg-sky-700": id,
                  "bg-green-600 hover:bg-green-800": !id,
                }
              )}
              //  onClick={onClickBtn}
            >
              <I18N id={`boxesDelivery.btn.${id ? "update" : "create"}`} />
            </button>
          </div>

          {/* {id ? (
            <button className="text-sm flex items-center gap-1 text-red-600">
              <Icon type="trash" />
              <I18N id="boxesDelivery.btn.delete" />
            </button>
          ) : null} */}
        </div>
      </div>
      <LoadingBox loading={loading} transparent />
    </Form>
  );
};
export default BoxEditor;
