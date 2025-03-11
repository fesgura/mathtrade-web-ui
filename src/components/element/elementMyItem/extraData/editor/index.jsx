import I18N from "@/i18n";
import PhotoGallery from "@/components/photoGallery";
import ErrorAlert from "@/components/errorAlert";
import { statusList } from "@/config/statusTypes";
import StatusBadge from "@/components/status-badge";
import clsx from "clsx";
import { maxCharacters, charactersDanger } from "@/config/maxCharacters";
import useExtraDataEditor from "./useExtraDataEditor";

import {
  Form,
  Input,
  InputContainer,
  Label,
  Select,
  Textarea,
  Hidden,
} from "@/components/form";
import { LoadingBox } from "@/components/loading";

const ExtraDataEditor = ({ toggleEditingMode, onCancel, forAddElement }) => {
  /***********************/

  const {
    validations,
    element_id,
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
      <div className="md:flex gap-4 mb-5">
        <div>
          <div className="md:w-60">
            <InputContainer validate="box_status">
              <Label text="element.BoxStatus" name="box_status" required />
              <Select
                data={{ box_status }}
                name="box_status"
                icon="status-box"
                options={statusList}
                onChange={setBoxStatus}
                size="sm"
              />
            </InputContainer>
          </div>
        </div>
        <div className="md:pt-7 md:pb-0">
          {box_status ? (
            <div className="flex flex-col">
              <StatusBadge status={box_status} type="box" />
              <p className="text-xs text-gray-600">
                <I18N id={`statusType.desc.${box_status}`} />
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="md:flex gap-4  mb-5">
        <div>
          <div className="md:w-60">
            <InputContainer validate="component_status">
              <Label
                text="element.ComponentsStatus"
                name="component_status"
                required
              />
              <Select
                data={{ component_status }}
                name="component_status"
                icon="status-components"
                options={statusList}
                onChange={setComponentStatus}
                size="sm"
              />
            </InputContainer>
          </div>
        </div>
        <div className="md:pt-7 md:pb-0">
          {component_status ? (
            <div className="flex flex-col">
              <StatusBadge status={component_status} />
              <p className="text-xs text-gray-600">
                <I18N id={`statusType.desc.${component_status}`} />
              </p>
            </div>
          ) : null}
        </div>
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

      <ErrorAlert error={error} />
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
