// import { useState, useEffect } from "react";
import FormAddTag from "./form";
import { useApi, MathTradeService } from "api_serv";

const AddTag = ({ onCancel, item, tag, afterAnyChange, filterByTag }) => {
  const [postTag, , loadingTag, errorTag] = useApi({
    promise: MathTradeService.postTag,
    afterLoad: () => {
      onCancel();
      afterAnyChange();
    },
  });

  const [putTag, , loadingPutTag, errorPutTag] = useApi({
    promise: MathTradeService.putTag,
    afterLoad: () => {
      onCancel();
      afterAnyChange();
    },
  });

  const [deleteTag, , loadingDeleteTag, errorDeleteTag] = useApi({
    promise: MathTradeService.deleteTag,
    afterLoad: () => {
      filterByTag(-1);
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
          putTag({
            ...d,
            id: tag.id,
          });
        } else {
          postTag(d);
        }
      }}
      onDelete={() => {
        deleteTag({
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
