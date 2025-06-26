import I18N from "@/i18n";
import Icon from "@/components/icon";
import clsx from "clsx";
import useBoxReceived from "./useBoxReceived";
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

const columns = [
  {
    header: "#",
    noTranslateHeader: true,
    value: "id",
    excel: (item, value, k) => {
      return k + 1;
    },
    render: (item, value, k) => {
      return k + 1;
    },
  },
  {
    header: "boxesReceived.table.invoice",
    value: "image",
    excel: false,
    render: (_, image) => {
      return !image ? (
        "-"
      ) : (
        <div className="w-16">
          <PhotoGallery images={image} extended noTitled />
        </div>
      );
    },
  },
  {
    header: "boxesReceived.table.tracking",
    value: "tracking",
    render: (_, tracking) => {
      return tracking ? (
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
      );
    },
    sort: true,
  },
  {
    header: "boxesReceived.table.origin_name",
    value: "origin_name",
    sort: true,
  },
  {
    header: "boxesReceived.table.price",
    value: "priceTotal",
    sort: true,
    render: ({ itemsCount, pricePerItem }, priceTotal) => {
      return (
        <>
          {`${priceTotal} / ${itemsCount} ejemplares = `}
          <strong>{`${pricePerItem} por ejemplar`}</strong>
        </>
      );
    },
    excel: ({ itemsCount, pricePerItem }, priceTotal) => {
      return `${priceTotal} / ${itemsCount} ejemplares = ${pricePerItem} por ejemplar`;
    },
  },
  {
    header: "boxesReceived.table.boxes",
    value: "boxes",
    render: (_, boxes) => {
      return boxes.map((box, k) => {
        return <BoxCell key={box.id} box={box} isFirst={k === 0} />;
      });
    },
    excel: ({ boxes }, value) => {
      return boxes
        .map((box) => {
          return (
            `${box.name}: ${box.items
              .map((item) => {
                return `${item.name} - recibe ${item.user}`;
              })
              .join(", ")}` +
            (box.comment ? `. Comentario: ${box.comment}` : "")
          );
        })
        .join("|");
    },
  },
];

const BoxesReceived = () => {
  const { trackings, loading, error } = useBoxReceived();

  return (
    <div className="relative min-h-[260px] pb-8">
      <Table
        loading={loading}
        error={error}
        columns={columns}
        data={trackings}
        downloadExcel
        searchValuesFunc={(tr) => {
          const { origin_name, boxes } = tr;

          const itemTexts = boxes
            .map((box) => {
              return box.items
                .map((item) => `${item.name} - ${item.user}`)
                .join("|");
            })
            .join("|");

          return `${origin_name || ""} ${itemTexts || ""}`;
        }}
      />
    </div>
  );
};

export default BoxesReceived;
