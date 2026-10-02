import I18N from "@/i18n";
import PhotoGallery from "@/components/photoGallery";
import ErrorAlert from "@/components/errorAlert";
import { resolveApiErrorMessage } from "@/utils/apiError";
import { boxStatusList, componentsStatusList } from "@/config/statusTypes";
import StatusBadge from "@/components/status-badge";
import clsx from "clsx";
import { useMemo } from "react";
import { maxCharacters, charactersDanger } from "@/config/maxCharacters";
import ReceivedCopies from "./receivedCopies";
import useExtraDataEditor from "./useExtraDataEditor";
import BoxSize from "@/components/boxSize";
import { boxSizesOptions } from "@/config/boxSizes";

import {
  Form,
  InputContainer,
  Label,
  Select,
  Textarea,
  Hidden,
} from "@/components/form";
import { LoadingBox } from "@/components/loading";
import RadioList from "@/components/form/inputTypes/radioList";
import Question from "@/components/question";

const boxSizesOptionsList = boxSizesOptions.map((option) => {
  const { value } = option;
  return { value, text: <BoxSize value={value} /> };
});

// The pill-styled StatusBadge label fits "Yo ofrezco", where the rest of
// the page is already pill-heavy (language/box-size chips on every card).
// Mi ludoteca's "add to MT" modal has none of that surrounding context, so
// the same pill there just looked like a mismatched, oddly-bolded option —
// plainStatusLabels swaps it for the same plain title+description style
// BoxSize already uses, so every option in the form reads consistently.
const statusOptionsList = (list, type, plainStatusLabels) =>
  list.map((option) => {
    const { value } = option;
    return {
      value,
      text: plainStatusLabels ? (
        <div>
          <div className="text-body-lg">
            <I18N id={`statusType.${type}.${value}`} />
          </div>
          <p className="text-caption italic text-gray-500 text-balance">
            <I18N id={`statusType.${type}.desc.${value}`} />
          </p>
        </div>
      ) : (
        <div>
          <StatusBadge status={value} type={type === "box" ? "box" : undefined} />
          <p className="text-xs text-gray-600">
            <I18N id={`statusType.${type}.desc.${value}`} />
          </p>
        </div>
      ),
    };
  });

const ExtraDataEditor = ({
  toggleEditingMode,
  onCancel,
  forAddElement,
  plainStatusLabels = false,
}) => {
  const boxStatusOptionsList = useMemo(
    () => statusOptionsList(boxStatusList, "box", plainStatusLabels),
    [plainStatusLabels]
  );
  const componentsStatusOptionsList = useMemo(
    () => statusOptionsList(componentsStatusList, "components", plainStatusLabels),
    [plainStatusLabels]
  );
  /***********************/

  const {
    validations,
    element_id,
    box_size,
    setBox_size,
    math_item,
    box_status,
    setBoxStatus,
    component_status,
    setComponentStatus,
    images,
    setImages,
    comment,
    setComment,
    onSubmit,
    loading,
    error,
  } = useExtraDataEditor(onCancel, toggleEditingMode);

  /**********************************/
  return (
    <Form validations={validations} onSubmit={onSubmit}>
      <Hidden data={{ element_id }} name="element_id" />
      <ReceivedCopies onUseComment={setComment} />

      <div className="border-b border-gray-400 pb-2 mb-3">
        <InputContainer validate="box_size">
          <div className="flex items-center gap-1 mb-3">
            <Label text="boxSizes.title" name="box_size" required />
            <Question text="boxSizes.description" />
          </div>

          <RadioList
            name="box_size"
            data={{ box_size }}
            options={boxSizesOptionsList}
            onChange={setBox_size}
          />
        </InputContainer>
      </div>

      <div className="border-b border-gray-400 pb-2 mb-3">
        <InputContainer validate="box_status">
          <Label
            text="element.BoxStatus"
            name="box_status"
            required
            className="mb-3"
          />
          <RadioList
            name="box_status"
            data={{ box_status }}
            options={boxStatusOptionsList}
            onChange={setBoxStatus}
          />
        </InputContainer>
      </div>
      <div className="border-b border-gray-400 pb-2 mb-3">
        <InputContainer validate="component_status">
          <Label
            text="element.ComponentsStatus"
            name="component_status"
            required
            className="mb-3"
          />

          <RadioList
            name="component_status"
            data={{ component_status }}
            options={componentsStatusOptionsList}
            onChange={setComponentStatus}
          />
        </InputContainer>
      </div>
      <InputContainer className="mb-5">
        <div className="flex items-center gap-2">
          <Label text="element.Comment" name="comment" />
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
      <PhotoGallery
        images={images}
        setImages={setImages}
        className="mb-3 border-b border-gray-300 pb-3"
      />
      <Hidden data={{ images }} name="images" />

      <ErrorAlert error={error} errorMessage={resolveApiErrorMessage(error)} />
      <div className="flex items-center justify-center gap-4 pt-2 pb-5">
        <button
          className="border border-gray-400 text-gray-500 font-bold text-lg px-6 py-1 rounded-full hover:bg-gray-400 hover:text-white transition-colors"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleEditingMode();
            if (onCancel) onCancel();
          }}
        >
          <I18N id="btn.Cancel" />
        </button>
        <button
          type="submit"
          className=" text-white bg-primary font-bold text-lg px-6 py-1 rounded-full hover:bg-sky-700 hover:text-white transition-colors"
        >
          <I18N
            id={
              forAddElement
                ? `btn.${math_item ? "AddToItem" : "CreateItem"}`
                : "btn.Save"
            }
          />
        </button>
      </div>
      <LoadingBox loading={loading} />
    </Form>
  );
};

export default ExtraDataEditor;
