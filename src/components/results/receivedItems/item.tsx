"use client";
import { ItemContext, ItemContextProvider } from "@/context/item";
import { useContext } from "react";
import ElementComplete from "@/components/element/elementComplete";
import I18N from "@/i18n";
import UserBox from "@/components/userBox";
import Icon from "@/components/icon";
import clsx from "clsx";
import {
  resolveItemKind,
  cardKindBorderClass,
  cardSurfaceClass,
} from "@/components/badgeType/cardKind";

const ItemUI = ({
  received = false,
  onOpenReceived = (_value?: any) => {},
  idResult = null,
}: {
  received?: boolean;
  onOpenReceived?: (value?: any) => void;
  idResult?: any;
}) => {
  const { item } = useContext(ItemContext);
  const { elements, title } = item;

  return (
    <article
      className={clsx(
        "transition-all relative mx-auto shadow-xl rounded-xl overflow-hidden",
        cardSurfaceClass,
        cardKindBorderClass(resolveItemKind(item))
      )}
    >
      <div className="flex flex-col gap-3 p-3">
        {elements.map((element: { id: string | number }) => {
          return <ElementComplete key={element.id} element={element} />;
        })}
      </div>
      <div className="flex justify-between bg-white/70 rounded-b-[0.7em] p-3 border-t border-gray-200">
        <UserBox toLeft />

        <div className="min-w-0 max-w-full sm:w-[220px] sm:flex justify-end text-sm font-bold sm:pl-2">
          {received ? (
            <div className="flex gap-1 items-center py-1 px-3 rounded-md text-green-700 border border-green-500 bg-green-500/10">
              <Icon type="check" />
              <I18N id="received.already" />
            </div>
          ) : (
            <button
              type="button"
              className="flex gap-1 items-center py-1 px-3 rounded-md  bg-green-600 text-white transition-colors hover:bg-sky-800"
              onClick={() => {
                onOpenReceived({ title, idResult });
              }}
            >
              <Icon type="check" />
              <I18N id="received.btn" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

const Item = ({
  itemRaw = null,
  received = false,
  onOpenReceived = (_value?: any) => {},
  idResult = null,
}: {
  itemRaw?: any;
  received?: boolean;
  onOpenReceived?: (value?: any) => void;
  idResult?: any;
}) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemUI
        received={received}
        onOpenReceived={onOpenReceived}
        idResult={idResult}
      />
    </ItemContextProvider>
  );
};

export default Item;
