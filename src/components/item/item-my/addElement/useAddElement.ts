import { useCallback, useState, useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import { getI18Ntext } from "@/i18n";

const useAddElement = (startOpen = false) => {
  const [isOpen, setIsOpen] = useState(startOpen || false);

  /* PAGE CONTEXT **********************************************/
  const { myCollectionFiltered, myCollectionList } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  /* end ITEM CONTEXT *********************************************/

  const itemId = item?.id || null;

  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  // Element waiting for confirmation: it is inside another combo.
  const [elementToMove, setElementToMove] = useState<any>(null);

  // New offer: only complete elements not offered yet.
  // Adding to a combo: also the offered ones (they move here), except those
  // already in this same combo.
  const options = useMemo(() => {
    return myCollectionList
      .filter((el: any) => {
        if (!itemId) return !el.mathItemId && el.complete;
        if (!el.mathItemId) return el.complete;
        return `${el.mathItemId}` !== `${itemId}`;
      })
      .map((el: any) => {
        if (!el.mathItemId) return el;
        const note = getI18Ntext(
          el.mathItemSize > 1
            ? "addElementToItem.offered.inCombo"
            : "addElementToItem.offered.alone"
        );
        return { ...el, note };
      });
  }, [myCollectionList, itemId]);

  const addElement = useCallback(() => {
    if (!myCollectionFiltered.length || !selectedElementId) {
      setSelectedElement(null);
      return;
    }
    const element = myCollectionFiltered.find((element: any) => {
      return `${element.id}` === selectedElementId;
    });
    if (!element) {
      setSelectedElement(null);
      return;
    }

    if (element.mathItemId && element.mathItemSize > 1) {
      // In another combo: ask before taking it out of there.
      setElementToMove(element);
    } else {
      // Not offered, or offered alone: it just becomes part of this combo.
      setSelectedElement(element);
    }
  }, [myCollectionFiltered, selectedElementId]);

  const confirmMove = useCallback(() => {
    setSelectedElement(elementToMove);
    setElementToMove(null);
  }, [elementToMove]);

  const cancelMove = useCallback(() => {
    setElementToMove(null);
  }, []);

  const onCancel = useCallback(() => {
    setSelectedElementId(null);
    setSelectedElement(null);
  }, []);

  return {
    isOpen,
    setIsOpen,
    itemId,
    myCollectionList: options,
    setSelectedElementId,
    selectedElementId,
    selectedElement,
    addElement,
    onCancel,
    elementToMove,
    confirmMove,
    cancelMove,
  };
};

export default useAddElement;
