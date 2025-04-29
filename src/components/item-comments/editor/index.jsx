import { Form, InputContainer, Label, Input } from "@/components/form";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import useCommentEditor from "./useCommentEditor";
import ErrorAlert from "@/components/errorAlert";
import clsx from "clsx";
import { LoadingBox } from "@/components/loading";
import { maxCharacters, charactersDanger } from "@/config/maxCharacters";

const CommentEditor = () => {
  const { content, setContent, validations, onSubmit, loading, errors } =
    useCommentEditor();

  return (
    <div className="relative pt-3 md:pl-4">
      <Form validations={validations} onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <Label
            text="itemComments.editor.label.add"
            name="comment"
            required
            className="text-black"
          />
          <span
            className={clsx("text-xs", {
              "text-gray-900":
                maxCharacters - content.length > charactersDanger,
              "text-danger font-bold":
                maxCharacters - content.length <= charactersDanger,
            })}
          >
            ({` ${content.length} / ${maxCharacters} `}
            <I18N id="itemComments.editor.label.add.adv" /> )
          </span>
        </div>

        <div className="flex gap-2">
          <div className="grow">
            <InputContainer validate="content">
              <Input
                name="content"
                rows={1}
                placeholder="itemComments.editor.label.placeholder"
                //disabled={loading}
                data={{ content }}
                onChange={({ target }) => {
                  setContent(target.value);
                }}
                maxlength={maxCharacters}
              />
            </InputContainer>
          </div>
          <div
            className="h-12"
            data-tooltip={getI18Ntext("itemComments.title.add")}
            data-placement="left"
          >
            <button
              className="bg-primary h-12 w-12 rounded-full text-white text-2xl grid place-items-center"
              disabled={loading}
            >
              <Icon type="send" />
            </button>
          </div>
        </div>
        <ErrorAlert error={errors} />
      </Form>
      <LoadingBox loading={loading} min zIndex={20} />
    </div>
  );
};

export default CommentEditor;
