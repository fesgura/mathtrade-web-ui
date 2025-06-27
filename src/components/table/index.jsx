import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import Th from "./th";
import Search from "./search";
import XlsButtonBtn from "@/components/xlsButton";
import useTable from "./useTable";

/*
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

*/

const Table = ({
  columns,
  data,
  searchValuesFunc,
  downloadExcel,
  loading,
  error,
  rowsProps,
}) => {
  const { order, setOrder, searchValue, setSearchValue, list, listJSON } =
    useTable(columns, data, searchValuesFunc, downloadExcel);

  if (!columns) {
    return <div className="text-center p-4 italic">Table not configured.</div>;
  }

  return (
    <div className="relative min-h-72">
      {typeof searchValuesFunc === "undefined" && !downloadExcel ? null : (
        <div
          className="py-3 px-5 flex flex-wrap gap-5 items-center justify-between
       border-b border-gray-300"
        >
          {typeof searchValuesFunc === "undefined" ? null : (
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          )}
          {downloadExcel ? (
            <XlsButtonBtn filename={downloadExcel} data={listJSON} />
          ) : null}
        </div>
      )}
      {error ? (
        <div className="px-5 pt-3 border-b border-gray-300">
          <ErrorAlert error />
        </div>
      ) : null}
      <div className="overflow-x-auto shadow-lg">
        <table className="w-full border border-gray-100 border-spacing-0 text-sm ">
          <thead className="border-b bg-gray-100 border-gray-300 align-top text-left">
            <tr>
              {columns.map((column, k) => {
                return (
                  <Th
                    key={`${column.value || "0"}__${k}`}
                    value={column.value}
                    order={order}
                    setOrder={setOrder}
                    isSortable={typeof column.sort !== "undefined"}
                    header={column.header}
                    noTranslateHeader={column.noTranslateHeader}
                  />
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white">
            {list.map((item, k) => {
              const row_props = rowsProps ? rowsProps(item) : {};
              return (
                <tr
                  key={`${item?.id || "0"}__${k}`}
                  className="border-b border-gray-400"
                  {...row_props}
                >
                  {columns.map((column, j) => {
                    return (
                      <td
                        className="p-2 align-top"
                        key={`${column.value || "0"}__${j}`}
                        style={column.style}
                      >
                        {column.render
                          ? column.render(item, item?.[column.value] || null, k)
                          : item?.[column.value] || null}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <LoadingBox loading={loading} transparent />
    </div>
  );
};

export default Table;
