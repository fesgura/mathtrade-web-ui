import I18N from "@/i18n";
import Icon from "@/components/icon";
import clsx from "clsx";
import { useState } from "react";
import PhotoGallery from "@/components/photoGallery";
import Table from "@/components/table";

const BoxCell = ({ box, isFirst }) => {
  const { name, items, comment } = box;

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div
      className={clsx("py-1 w-64", {
        "border-t border-gray-300": !isFirst,
      })}
    >
      <header className="flex items-center gap-3">
        <h5 className="">{name}</h5>
        <button
          className="uppercase font-bold text-[10px] text-sky-700 hover:text-sky-900 transition-colors"
          onClick={toggleOpen}
        >
          <I18N
            id={`boxesReceived.showItems.${isOpen > 0 ? "hide" : "show"}`}
            values={[items.length]}
          />
          <Icon
            type="chevron-down"
            className={clsx("text-base transition-transform", {
              "rotate-180": isOpen,
            })}
          />
        </button>
      </header>
      {isOpen ? (
        <div className="flex flex-col gap-2 py-3">
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className="text-xs border border-primary/80 bg-primary/20 py-1 px-2 rounded-md"
              >
                <div className="font-bold"> {item.name}</div>
                <div className="">recibe {item.user}</div>
              </div>
            );
          })}
          {comment ? (
            <div className="text-xs text-balance p-2 border border-gray-300 rounded-md">
              {comment}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
export default BoxCell;
