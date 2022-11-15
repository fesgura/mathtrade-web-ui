// import { useState, useEffect } from "react";
import FormAddGroup from "./form";
import { useApi, MathTradeService } from "api";

const AddGroup = ({
  onCancel,
  item,
  group,
  forNotOwnItems,
  afterAnyChange,
}) => {
  const [postMyItemGroup, , loadingMyItemGroup, errorMyItemGroup] = useApi({
    promise: MathTradeService.postMyItemGroups,
    afterLoad: () => {
      onCancel();
      afterAnyChange();
    },
  });

  const [putMyItemGroups, , loadingPutMyItemGroup, errorPutMyItemGroup] =
    useApi({
      promise: MathTradeService.putMyItemGroups,
      afterLoad: () => {
        onCancel();
        afterAnyChange();
      },
    });

  const [
    deleteMyItemGroups,
    ,
    loadingDeleteMyItemGroup,
    errorDeleteMyItemGroup,
  ] = useApi({
    promise: MathTradeService.deleteMyItemGroups,
    afterLoad: () => {
      onCancel();
      afterAnyChange();
    },
  });

  return (
    <FormAddGroup
      item={item}
      group={group}
      onSubmit={(d) => {
        if (group) {
          putMyItemGroups({
            ...d,
            id: group.id,
          });
        } else {
          postMyItemGroup(d);
        }
      }}
      onDelete={() => {
        deleteMyItemGroups({
          id: group?.id,
        });
      }}
      onCancel={onCancel}
      loading={
        loadingMyItemGroup || loadingPutMyItemGroup || loadingDeleteMyItemGroup
      }
      errors={errorMyItemGroup || errorPutMyItemGroup || errorDeleteMyItemGroup}
    />
  );
};

export default AddGroup;
