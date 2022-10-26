import { useState, useEffect } from "react";
import AddItemView from "views/mathtrade/myItems/addItem";
import { useApi, myCollectionService, MathTradeService } from "api";

const AddItem = ({ onClose, itemList, afterAnyChange }) => {
  const [items, seItems] = useState([]);

  const [
    listCollection,
    collectionList,
    loadingCollectionList,
    errorCollectionList,
  ] = useApi({
    promise: myCollectionService.listItems,
    initialState: [],
  });

  useEffect(() => {
    listCollection();
  }, []);

  ////////////////////////
  const [publishItem, , loadingPublishItem, errorPublishItem] = useApi({
    promise: MathTradeService.publishItem,
    afterLoad: () => {
      afterAnyChange();
      listCollection();
    },
  });

  return (
    <AddItemView
      onClose={onClose}
      collectionList={collectionList}
      itemList={itemList}
      loading={loadingCollectionList || loadingPublishItem}
      errors={errorCollectionList || errorPublishItem}
      publishItem={(item) => {
        publishItem({
          data: {
            item_id: item.id,
          },
        });
      }}
    />
  );
};
export default AddItem;
