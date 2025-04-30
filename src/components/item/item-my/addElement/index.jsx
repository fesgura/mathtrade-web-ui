import useAddElement from "./useAddElement";
import AddElementToMyItemSelector from "./selector";
import NewElement from "./newElement";
import I18N from "@/i18n";
import clsx from "clsx";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import AddFromPreviousMTBtn from "../addFromPreviousMtBtn";

const AddElementToMyItem = ({ startOpen }) => {
  const {
    isOpen,
    setIsOpen,
    itemId,
    myCollectionList,
    setSelectedElementId,
    selectedElementId,
    selectedElement,
    addElement,
    onCancel,
  } = useAddElement(startOpen);

  return (
    <>
      {isOpen ? (
        <div
          className={clsx({
            "mt-2 pt-2 border-t border-item-400": selectedElement,
          })}
        >
          <h2
            className={clsx(
              "text-gray-900 text-balance sm:text-left text-center",
              {
                "mb-1": !selectedElement,
                "mb-2": selectedElement,
              }
            )}
          >
            <I18N
              id={`addElementToItem.${itemId ? "addCombo" : "create"}.title.1`}
            />
            <Link
              href={PRIVATE_ROUTES.MY_COLLECTION.path}
              className="text-primary font-bold underline hover:text-sky-700"
            >
              <I18N id="addElementToItem.collection" />
            </Link>
            <I18N
              id={`addElementToItem.${itemId ? "addCombo" : "create"}.title.2`}
            />
            :
          </h2>
          {selectedElement ? (
            <NewElement element={selectedElement} onCancel={onCancel} />
          ) : (
            <div className="flex md:flex-row flex-col md:items-end items-center md:gap-0 gap-5">
              <div className="grow w-full">
                <AddElementToMyItemSelector
                  myCollectionList={myCollectionList}
                  selectedElementId={selectedElementId}
                  setSelectedElementId={setSelectedElementId}
                  addElement={addElement}
                />
              </div>
              {itemId ? null : <AddFromPreviousMTBtn />}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className=" border border-item-600 text-sm rounded-full py-1 px-4 hover:bg-item-600 hover:text-white transition-colors"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <I18N id="addElementToItem.addCombo.title" />
          </button>
        </div>
      )}
    </>
  );
};
export default AddElementToMyItem;
