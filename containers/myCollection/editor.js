import ElementEditorView from "views/myCollection/editor";
import { useApi, BggService, ElementService } from "api_serv";
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

  // CREATE ELEMENT
  const [createElement, , loadingCreateElement, errorCreateMessage] = useApi({
    promise: ElementService.post,
    afterLoad: () => {
      onClose();
      afterAnyChange();
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

        dataToSend.item_title = setItemTitle(objToEdit.item, data);
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
