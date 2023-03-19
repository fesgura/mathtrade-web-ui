import { useRef } from "react";
import ElementEditorView from "views/myCollection/editor";
import {
  useApi,
  BggService,
  ElementService,
  myCollectionService,
} from "api_serv";
import { setItemTitle } from "./utils";
import { useEffect } from "react";

const ElementEditor = ({
  objToEdit,
  itemList,
  onClose,
  afterAnyChange,
  onLoadingEditor,
  setItemToDelete,
}) => {
  const old_item_title = useRef("");
  const new_item_title = useRef("");

  // BGG ELEMENT
  const [fetchBGGelement, BGGelement, loadingBGGelement, errorMessage] = useApi(
    {
      promise: BggService.getElement,
      forBGG: true,
      format: (data) => {
        if (data && data.items && data.items.item) {
          return data.items.item;
        } else {
          return null;
        }
      },
    }
  );

  // End BGG ELEMENT

  // EDIT ITEM
  const [editItem, , loadingEditItem, errorEditItem] = useApi({
    promise: myCollectionService.editItem,
    afterLoad: () => {
      onClose();
      afterAnyChange();
    },
  });
  // End EDIT ITEM

  // CREATE ELEMENT
  const [createElement, , loadingCreateElement, errorCreateMessage] = useApi({
    promise: ElementService.post,
    afterLoad: (elem) => {
      if (
        old_item_title.current !== "" &&
        old_item_title.current !== new_item_title.current
      ) {
        editItem({
          id: elem.item_id,
          data: { title: new_item_title.current },
        });
      } else {
        onClose();
        afterAnyChange();
      }
    },
  });
  // End CREATE ELEMENT

  // EDIT ELEMENT
  const [editElement, , loadingEditElement, errorEditMessage] = useApi({
    promise: ElementService.put,
    afterLoad: () => {
      onClose();
      afterAnyChange();
    },
  });
  // End EDIT ELEMENT

  useEffect(() => {
    if (onLoadingEditor) {
      onLoadingEditor(loadingEditElement || loadingCreateElement);
    }
  }, [onLoadingEditor, loadingEditElement, loadingCreateElement]);

  return (
    <ElementEditorView
      objToEdit={objToEdit}
      itemList={itemList}
      onClose={onClose}
      onSaveElement={(data) => {
        let dataToSend = JSON.parse(JSON.stringify(data));
        const create = dataToSend.create;
        delete dataToSend.create;

        old_item_title.current = objToEdit?.item?.title || "";
        new_item_title.current = setItemTitle(objToEdit.item, data, create);

        dataToSend.item_title = new_item_title.current;
        dataToSend.item_id = objToEdit.item ? objToEdit.item.id : null;

        if (create) {
          // Create new
          delete dataToSend.id;
          createElement(dataToSend);
        } else {
          editElement({
            id: data.id,
            data: dataToSend,
          });
        }
      }}
      setItemToDelete={setItemToDelete}
      afterAnyChange={afterAnyChange}
      loading={loadingEditElement || loadingCreateElement}
      errors={errorEditMessage || errorCreateMessage}
      // BGG ELEMENT
      fetchBGGelement={fetchBGGelement}
      BGGelement={BGGelement}
      loadingBGGelement={loadingBGGelement}
    />
  );
};

export default ElementEditor;
