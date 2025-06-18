import I18N, { getI18Ntext } from "@/i18n";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { DateIntlFormat } from "@/utils/dateUtils";
import XlsButtonBtn from "@/components/xlsButton";
import useTable from "./useTable";

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

const Items = () => {
  const {
    itemTable,
    listJSON,
    loading,
    error,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  } = useTable();
  return (
    <div className="relative min-h-[260px] pt-2">
      <div
        className="pb-3  mb-5 flex flex-wrap gap-5 items-center justify-between
       border-b border-gray-400"
      >
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <XlsButtonBtn filename="ejemplares" data={listJSON} />
      </div>

      <ErrorAlert error={error} />
      <div className="overflow-x-auto shadow-lg">
        <table className="w-full  border border-gray-100 shadow border-spacing-0 text-sm ">
          <thead className="border-b bg-gray-100 border-gray-300 align-top text-left">
            <tr>
              <Th>#</Th>
              <Th>
                <I18N id="boxesDelivery.items.code" />
              </Th>
              <Th value="user" order={order} setOrder={setOrder}>
                <I18N id="boxesDelivery.items.user" />
              </Th>
              <Th value="title" order={order} setOrder={setOrder}>
                <I18N id="boxesDelivery.items.title" />
              </Th>
              <Th value="boxNumber" order={order} setOrder={setOrder}>
                <I18N id="boxesDelivery.items.boxNumber" />
              </Th>
              <Th value="destinyName" order={order} setOrder={setOrder}>
                <I18N id="boxesDelivery.items.destinyName" />
              </Th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {itemTable.map((item, k) => {
              const {
                id,
                assigned_trade_code,
                user,
                title,
                boxNumber,
                destinyName,
              } = item;

              return (
                <tr key={id} className="border-b border-gray-400">
                  <td className="p-2">{k + 1}</td>
                  <td className="p-2">{assigned_trade_code}</td>
                  <td className="p-2">{user}</td>
                  <td className="p-2">{title}</td>
                  <td className="p-2 w-40">{boxNumber || "-"}</td>
                  <td className="p-2">{destinyName}</td>
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

export default Items;
