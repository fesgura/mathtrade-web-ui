import { useCallback, useState, useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";

const useAddElement = (startOpen) => {
  const [isOpen, setIsOpen] = useState(startOpen || false);

  /* PAGE CONTEXT **********************************************/
  const { myCollectionFiltered, myCollectionList } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  /* end ITEM CONTEXT *********************************************/

  const [selectedElementId, setSelectedElementId] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const addElement = useCallback(() => {
    if (!myCollectionFiltered.length || !selectedElementId) {
      setSelectedElement(null);
    }
    const element = myCollectionFiltered.find((element) => {
      return `${element.id}` === selectedElementId;
    });
    setSelectedElement(element || null);
  }, [myCollectionFiltered, selectedElementId]);

  const onCancel = useCallback(() => {
    setSelectedElementId(null);
    setSelectedElement(null);
  }, []);

  return {
    isOpen,
    setIsOpen,
    itemId: item?.id || null,
    myCollectionList,
    setSelectedElementId,
    selectedElementId,
    selectedElement,
    addElement,
    onCancel,
  };
};

export default useAddElement;
