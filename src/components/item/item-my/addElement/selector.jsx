import InnerButton from "@/components/button/inner-button";
import Thumbnail from "@/components/thumbnail";
import { Select } from "@/components/form";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";
import { useMemo } from "react";

const AddElementToMyItemSelector = ({
  myCollectionList,
  setSelectedElementId,
  selectedElementId,
  addElement,
}) => {
  const elementSelected = useMemo(() => {
    return myCollectionList.find((element) => {
      return element.value === selectedElementId;
    });
  }, [myCollectionList, selectedElementId]);

  return (
    <div className="flex items-center rounded-md shadow-md">
      <div className="grow bg-white rounded-l-md flex items-center">
        {elementSelected ? (
          <div className="w-12">
            <Thumbnail
              className="w-12 rounded-l-md"
              src={elementSelected?.thumbnail}
            />
          </div>
        ) : null}
        <div className="grow">
          <Select
            options={myCollectionList}
            onChange={setSelectedElementId}
            customRenderOption={(option) => {
              const { text, thumbnail } = option;
              return (
                <div className="flex items-center gap-1 py-1">
                  <div className="w-12">
                    <Thumbnail className="w-10" src={thumbnail} />
                  </div>
                  <div>{text}</div>
                </div>
              );
            }}
            noBorder
            startFocus
          />
        </div>
      </div>

      <button
        className={clsx(
          " rounded-r-md text-white font-bold sm:px-6 px-3 py-3 sm:text-base text-2xl",
          {
            "bg-primary": selectedElementId,
            "bg-gray-300": !selectedElementId,
          }
        )}
        disabled={!selectedElementId}
        onClick={addElement}
      >
        <InnerButton>
          <Icon type="plus" />
          <span className="sm:block hidden">
            <I18N id="addElementToItem" />
          </span>
        </InnerButton>
      </button>
    </div>
  );
};
export default AddElementToMyItemSelector;
