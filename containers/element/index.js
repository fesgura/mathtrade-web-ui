import ElementView from "views/element";
import { useApi, BggElementService, ElementService } from "api";
import { setItemTitle } from "./utils";

const Element = ({ element = null, item, afterAnyChange }) => {
  // BGG ELEMENT
  const [fetchBGGelement, BGGelement, loadingBGGelement, errorMessage] = useApi(
    {
      promise: BggElementService.get,
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
      afterAnyChange();
    },
  });
  // End CREATE ELEMENT

  // EDIT ELEMENT
  const [editElement, , loadingEditElement, errorEditMessage] = useApi({
    promise: ElementService.put,
    afterLoad: () => {
      afterAnyChange();
    },
  });
  // End EDIT ELEMENT

  // DELETE ELEMENT
  const [deleteElement, , loadingDeleteElement, errorDeleteMessage] = useApi({
    promise: ElementService.delete,
    afterLoad: () => {
      afterAnyChange();
    },
  });
  // End DELETE ELEMENT

  return (
    <ElementView
      element={element}
      item={item}
      onSaveElement={(data) => {
        let dataToSend = JSON.parse(JSON.stringify(data));
        const create = dataToSend.create;
        delete dataToSend.create;

        dataToSend.item_title = setItemTitle(item, data);
        dataToSend.item_id = item ? item.id : null;

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
      deleteElement={deleteElement}
      loading={
        loadingEditElement || loadingCreateElement || loadingDeleteElement
      }
      errors={errorEditMessage || errorCreateMessage || errorDeleteMessage}
      // BGG ELEMENT
      fetchBGGelement={fetchBGGelement}
      BGGelement={BGGelement}
      loadingBGGelement={loadingBGGelement}
    />
  );
};
export default Element;
