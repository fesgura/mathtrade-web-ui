// import { useState, useEffect } from "react";
import FormAddTag from "./form";
import { useApi, MathTradeService } from "api_serv";

const AddTag = ({ onCancel, item, tag, afterAnyChange }) => {
  const [postTag, , loadingTag, errorTag] = useApi({
    promise: MathTradeService.postTag,
    afterLoad: () => {
      onCancel();
      afterAnyChange();
    },
  });

  const [putTags, , loadingPutTag, errorPutTag] = useApi({
    promise: MathTradeService.putTag,
    afterLoad: () => {
      onCancel();
      afterAnyChange();
    },
  });

  const [deleteTags, , loadingDeleteTag, errorDeleteTag] = useApi({
    promise: MathTradeService.deleteTag,
    afterLoad: () => {
      onCancel();
      afterAnyChange();
    },
  });

  return (
    <FormAddTag
      item={item}
      tag={tag}
      onSubmit={(d) => {
        if (tag) {
          putTags({
            ...d,
            id: tag.id,
          });
        } else {
          postTag(d);
        }
      }}
      onDelete={() => {
        deleteTags({
          id: tag?.id,
        });
      }}
      onCancel={onCancel}
      loading={loadingTag || loadingPutTag || loadingDeleteTag}
      errors={errorTag || errorPutTag || errorDeleteTag}
    />
  );
};

export default AddTag;
