"use client";
import useItemPreviousMT from "./useItemPreviousMT";
import ElementComplete from "@/components/element/elementComplete";
import I18N from "@/i18n";
import { LoadingBox } from "@/components/loading";
import ValueMini from "@/components/value/mini";
import ErrorAlert from "@/components/errorAlert";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import clsx from "clsx";
import {
  resolveItemKind,
  cardKindBorderClass,
  cardSurfaceClass,
} from "@/components/badgeType/cardKind";
import { resolveApiErrorMessage } from "@/utils/apiError";

const ItemUI = ({ afterAddItem = (_value?: any) => {} }) => {
  const { isCombo, value, elements, addToMT, loading, error } =
    useItemPreviousMT();
  const { item } = useContext(ItemContext);

  return (
    <div
      className={clsx(
        "relative rounded-lg shadow-md pt-2 px-3 pb-3 mb-6 overflow-hidden",
        cardSurfaceClass,
        cardKindBorderClass(resolveItemKind(item))
      )}
    >
      <header className="flex items-center justify-between  gap-3 mb-2">
        {isCombo ? (
          <h3 className="uppercase text-sm font-bold text-gray-900 leading-none">
            <I18N id="element-type-badge-0" />
          </h3>
        ) : (
          <div />
        )}
        <ValueMini currentValue={value} />
      </header>

      <div className="flex flex-col gap-3">
        {elements.map((element: { id: string | number }) => {
          return <ElementComplete key={element.id} element={element} />;
        })}
      </div>
      <div className="pt-3">
        <ErrorAlert error={error} errorMessage={resolveApiErrorMessage(error)} />
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-primary text-white py-1 px-5 rounded-full shadow-md transition-colors hover:bg-sky-700 text-balance"
            onClick={addToMT}
          >
            <I18N id="addItemPreviousMT.btn" />
          </button>
        </div>
      </div>

      <LoadingBox loading={loading} min />
    </div>
  );
};

export default ItemUI;
