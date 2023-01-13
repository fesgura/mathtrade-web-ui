import ElementEditorView from "views/myCollection/editor";
import {
  useApi,
  BggService,
  ElementService,
  myCollectionService,
} from "api_serv";
import { setItemTitle } from "./utils";

const ElementEditor = ({ objToEdit, onClose, afterAnyChange }) => {
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

  // DELETE ELEMENT
  const [deleteElement, , loadingDeleteElement, errorDeleteMessage] = useApi({
    promise: ElementService.delete,
    afterLoad: () => {
      onClose();
      afterAnyChange();
    },
  });
  // End DELETE ELEMENT

  // DELETE ITEM
  const [deleteItem, , loadingDeleteItem, errorDeleteItemMessage] = useApi({
    promise: myCollectionService.deleteItem,
    afterLoad: () => {
      onClose();
      afterAnyChange();
    },
  });
  // End DELETE ELEMENT

  return (
    <ElementEditorView
      objToEdit={objToEdit}
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
      deleteElement={(idElement) => {
        if (objToEdit.item.elements.length === 1) {
          deleteItem(objToEdit.item.id);
        } else {
          deleteElement(idElement);
        }
      }}
      loading={
        loadingEditElement ||
        loadingCreateElement ||
        loadingDeleteElement ||
        loadingDeleteItem
      }
      errors={
        errorEditMessage ||
        errorCreateMessage ||
        errorDeleteMessage ||
        errorDeleteItemMessage
      }
      // BGG ELEMENT
      fetchBGGelement={fetchBGGelement}
      BGGelement={BGGelement}
      loadingBGGelement={loadingBGGelement}
    />
  );
};

export default ElementEditor;
