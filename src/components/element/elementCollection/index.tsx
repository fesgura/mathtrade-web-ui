"use client";
import { useCallback, useState, lazy, type ReactNode } from "react";
import ElementView from "./elementView";
import { ElementContextProvider } from "@/context/element";
import Dynamic from "@/components/dynamic";
import Modal from "@/components/modal";
import I18N from "@/i18n";

const ElementEditor = lazy(() => import("./editor"));
const ExtraDataEditor = lazy(
  () => import("@/components/element/elementMyItem/extraData/editor")
);

const ElementCollection = ({
  element = null,
  insideItem = false,
  extraContent = null,
  header = null,
  layout = "poster",
  // MAT-131: lets "Mi ludoteca" offer a one-click "add to MT" per card,
  // reusing the same box_size/box_status/component_status form the
  // my-offer "add from collection" flow already uses — opt-in since
  // ElementCollection is also nested inside that very flow, where this
  // button would be redundant/out of place.
  showAddToMT = false,
}: {
  element?: any;
  insideItem?: boolean;
  extraContent?: ReactNode;
  header?: ReactNode;
  layout?: "poster" | "row";
  showAddToMT?: boolean;
}) => {
  // Keep the card visible; the form lives in a modal so the 340px grid cell
  // no longer clips it.
  const [editingMode, setEditingMode] = useState(false);
  const toggleEditingMode = useCallback(() => {
    setEditingMode((v) => !v);
  }, []);

  const [addingToMT, setAddingToMT] = useState(false);
  const toggleAddingToMT = useCallback(() => {
    setAddingToMT((v) => !v);
  }, []);

  return (
    <ElementContextProvider elementRaw={element}>
      <ElementView
        toggleEditingMode={toggleEditingMode}
        insideItem={insideItem}
        extraContent={extraContent}
        header={header}
        layout={layout}
        showAddToMT={showAddToMT}
        onAddToMT={toggleAddingToMT}
      />
      <Modal isOpen={editingMode} onClose={toggleEditingMode} size="md2">
        <Dynamic h={600}>
          <ElementEditor toggleEditingMode={toggleEditingMode} />
        </Dynamic>
      </Modal>
      {showAddToMT ? (
        <Modal isOpen={addingToMT} onClose={toggleAddingToMT} size="md2">
          {/* From Mi ludoteca a copy goes in on its own; combos are made
              in Yo ofrezco. */}
          <p className="mx-4 mt-4 mb-1 rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-sm text-gray-700">
            <I18N id="collection.addToMT.single" />
          </p>
          <Dynamic h={600}>
            {/* No ItemContextProvider here on purpose: this is a brand-new
                item with no math_item yet, which is exactly ItemContext's
                own default value (item: null) — instantiating a real
                Provider with itemRaw={null} runs its internal item.elements
                render-gate (context/item/index.js), which assumes item is
                never null and crashes. Same reasoning the existing my-offer
                "add from collection" flow already relies on. */}
            <ExtraDataEditor
              forAddElement
              onCancel={undefined}
              toggleEditingMode={toggleAddingToMT}
              plainStatusLabels
            />
          </Dynamic>
        </Modal>
      ) : null}
    </ElementContextProvider>
  );
};
export default ElementCollection;
