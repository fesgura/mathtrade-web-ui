import I18N, { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import XlsButtonBtn from "@/components/xlsButton";
import useBoxReceived from "./useBoxReceived";

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
    <div className="relative min-h-[260px] max-w-5xl mx-auto pt-2 pb-8">
      <div
        className="pb-3 px-5  mb-5 flex flex-wrap gap-5 items-center justify-between
       border-b border-gray-400"
      >
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <XlsButtonBtn filename="cajas_que_recibo" data={listJSON} />
      </div>

      <ErrorAlert error={error} />
      <div className="overflow-x-auto shadow-lg">
        <table className="w-full  border border-gray-100 shadow border-spacing-0 text-sm ">
          <thead className="border-b bg-gray-100 border-gray-300 align-top text-left">
            <tr>
              <Th>#</Th>
              <Th value="tracking" order={order} setOrder={setOrder}>
                <I18N id="boxesReceived.table.tracking" />
              </Th>
              <Th value="origin_name" order={order} setOrder={setOrder}>
                <I18N id="boxesReceived.table.origin_name" />
              </Th>
              <Th value="boxes" order={order} setOrder={setOrder}>
                <I18N id="boxesReceived.table.boxes" />
              </Th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {trackings.map((item, k) => {
              const { origin_name, tracking, boxes } = item;

              return (
                <tr
                  key={`${tracking}-${k}`}
                  className="border-b border-gray-400"
                >
                  <td className="p-2">{k + 1}</td>
                  <td className="p-2">
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
                  <td className="p-2">{origin_name}</td>
                  <td className="p-2">{boxes.length}</td>
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

export default BoxesReceived;
