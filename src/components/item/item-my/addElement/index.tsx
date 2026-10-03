"use client";
import useAddElement from "./useAddElement";
import AddElementToMyItemSelector from "./selector";
import NewElement from "./newElement";
import I18N from "@/i18n";
import clsx from "clsx";
import Link from "next/link";
import { PRIVATE_ROUTES } from "@/config/routes";
import AddFromPreviousMTBtn from "../addFromPreviousMtBtn";
import ConfirmModal from "@/components/confirmModal";

const AddElementToMyItem = ({ startOpen = false }: { startOpen?: boolean }) => {
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
    elementToMove,
    confirmMove,
    cancelMove,
  } = useAddElement(startOpen);

  return (
    <>
      {isOpen ? (
        <div
          className={clsx({
            "mt-2 pt-2 border-t border-gray-200": selectedElement,
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
            type="button"
            className="border border-gray-400 text-sm rounded-full py-1 px-4 hover:bg-gray-800 hover:text-white transition-colors"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <I18N id="addElementToItem.addCombo.title" />
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={!!elementToMove}
        onCancel={cancelMove}
        onConfirm={confirmMove}
        title="addElementToItem.move.title"
        description="addElementToItem.move.description"
        descriptionValues={[elementToMove?.mathItemTitle || ""]}
        confirmId="addElementToItem.move.confirm"
      />
    </>
  );
};
export default AddElementToMyItem;
