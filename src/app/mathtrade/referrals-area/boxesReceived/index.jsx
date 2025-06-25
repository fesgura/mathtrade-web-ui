import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import XlsButtonBtn from "@/components/xlsButton";
import useBoxReceived from "./useBoxReceived";
import { useState } from "react";
import PhotoGallery from "@/components/photoGallery";

const BoxCell = ({ box, isFirst }) => {
  const { name, items, comment } = box;

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((v) => !v);
  };

  return (
    <div
      className={clsx("py-1 max-w-72", {
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
                <div className=""> {item.user}</div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className="flex items-center gap-1">
      <label className="block text-sm font-bold text-gray-500 whitespace-nowrap">
        <I18N id="filter.Search" />
      </label>
      <input
        type="text"
        placeholder={getI18Ntext("filter.Search")}
        value={searchValue || ""}
        onChange={({ target }) => {
          setSearchValue(target.value);
        }}
        className="border border-stroke rounded-md p-1 text-xs focus:outline-none"
      />
    </div>
  );
};

const Th = ({ value, order, setOrder, children, className }) => {
  const dir = value ? (order?.indexOf("-") === 0 ? -1 : 1) : 1;
  return (
    <th className={clsx("text-left p-2", className)}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={
          value
            ? () => {
                if (order.indexOf(value) >= 0) {
                  if (dir > 0) {
                    setOrder("-" + value);
                  } else {
                    setOrder(value);
                  }
                } else {
                  setOrder(value);
                }
              }
            : null
        }
      >
        <div>{children}</div>
        <div
          className={clsx("text-xl leading-none", {
            "opacity-20": order?.indexOf(value) < 0,
          })}
        >
          {value ? <Icon type={`chevron-${dir < 0 ? "up" : "down"}`} /> : null}
        </div>
      </div>
    </th>
  );
};

const BoxesReceived = () => {
  const {
    trackings,
    listJSON,
    loading,
    error,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  } = useBoxReceived();

  return (
    <div className="relative min-h-[260px] xmax-w-5xl xmx-auto pt-2 pb-8">
      <ErrorAlert error={error} />
      <div
        className="pb-3 px-5  mb-5 flex flex-wrap gap-5 items-center justify-between
       border-b border-gray-400"
      >
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <XlsButtonBtn filename="cajas_que_recibo" data={listJSON} />
      </div>
      {trackings.length === 0 && !loading && !error ? (
        <div className="text-center text-xl italic p-8">
          <I18N id="boxesReceived.table.emptyList" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg">
            <table className="w-full  border border-gray-100 shadow border-spacing-0 text-sm ">
              <thead className="border-b bg-gray-100 border-gray-300 align-top text-left">
                <tr>
                  <Th>#</Th>
                  <Th>
                    <I18N id="boxesReceived.table.invoice" />
                  </Th>
                  <Th value="tracking" order={order} setOrder={setOrder}>
                    <I18N id="boxesReceived.table.tracking" />
                  </Th>
                  <Th value="origin_name" order={order} setOrder={setOrder}>
                    <I18N id="boxesReceived.table.origin_name" />
                  </Th>
                  <Th value="priceTotal" order={order} setOrder={setOrder}>
                    <I18N id="boxesReceived.table.price" />
                  </Th>
                  <Th>
                    <I18N id="boxesReceived.table.boxes" />
                  </Th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {trackings.map((item, k) => {
                  const {
                    id,
                    image,
                    origin_name,
                    tracking,
                    boxes,
                    priceTotal,
                    itemsCount,
                    pricePerItem,
                  } = item;

                  return (
                    <tr key={`${id}-${k}`} className="border-b border-gray-400">
                      <td className="p-2 align-top">{k + 1}</td>
                      <td className="p-2 align-top">
                        {!image ? (
                          "-"
                        ) : (
                          <div className="w-16">
                            <PhotoGallery images={image} extended noTitled />
                          </div>
                        )}
                      </td>

                      <td className="p-2 align-top">
                        {tracking ? (
                          <a
                            href={`https://www.viacargo.com.ar/tracking/${tracking}`}
                            className="text-primary font-bold  hover:text-sky-700 underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {tracking}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-2 align-top">{origin_name}</td>
                      <td className="p-2 align-top">
                        {`${priceTotal} / ${itemsCount} ejemplares = `}
                        <strong>{`${pricePerItem} por ejemplar`}</strong>
                      </td>
                      <td className="p-2 align-top">
                        {boxes.map((box, k) => {
                          return (
                            <BoxCell key={box.id} box={box} isFirst={k === 0} />
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <LoadingBox loading={loading} transparent />
    </div>
  );
};

export default BoxesReceived;
