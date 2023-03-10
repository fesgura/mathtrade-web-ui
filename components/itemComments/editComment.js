import { useState } from "react";
import { Input } from "components/form";
import { Button } from "reactstrap";
import { useApi, MathTradeService } from "api_serv";
import I18N from "i18n";

const EditComment = ({ item_id, commentToEdit, onCancel, afterAnyChange }) => {
  const [content, setContent] = useState(commentToEdit?.content || "");

  const [postComment] = useApi({
    promise: MathTradeService.postComment,
    afterLoad: afterAnyChange,
  });

  const [putComment] = useApi({
    promise: MathTradeService.putComment,
    afterLoad: afterAnyChange,
  });

  return (
    <div className="item-comments-form">
      <div className="item-comments-form-label">
        <I18N
          id={`itemComments.editor.label.${commentToEdit ? "edit" : "add"}`}
        />
      </div>
      <Input
        textSize={500}
        name="comment"
        value={content}
        type="textarea"
        onChange={setContent}
        classNameContainer="mb-2"
      />
      <div className="text-center">
        {commentToEdit ? (
          <Button
            size="sm"
            color="link"
            outline
            className="me-2"
            onClick={() => {
              if (onCancel) onCancel();
            }}
          >
            <I18N id="btn.Cancel" />
          </Button>
        ) : null}
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            if (commentToEdit) {
              const dataToSend = { ...commentToEdit, content };
              delete dataToSend.id;
              putComment({
                item_id,
                comment_id: commentToEdit.id,
                data: dataToSend,
              });
            } else {
              postComment({
                item_id,
                data: { content },
              });
            }
          }}
        >
          <I18N id={`btn.${commentToEdit ? "Save" : "Add"}`} />
        </Button>
      </div>
    </div>
  );
};

export default EditComment;
