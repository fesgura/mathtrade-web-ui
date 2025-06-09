import I18N, { getI18Ntext } from "@/i18n";
import useUserTable from "./useUserTable";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { DateIntlFormat } from "@/utils/dateUtils";
import XlsButtonBtn from "@/components/xlsButton";

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
  const dir = order.indexOf("-") === 0 ? -1 : 1;
  return (
    <th className={clsx("text-left p-2", className)}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          if (order.indexOf(value) >= 0) {
            if (dir > 0) {
              setOrder("-" + value);
            } else {
              setOrder(value);
            }
          } else {
            setOrder(value);
          }
        }}
      >
        <div>{children}</div>
        <div
          className={clsx("text-xl leading-none", {
            "opacity-20": order.indexOf(value) < 0,
          })}
        >
          <Icon type={`chevron-${dir < 0 ? "up" : "down"}`} />
        </div>
      </div>
    </th>
  );
};

const UserTable = () => {
  const {
    list,
    listJSON,
    loading,
    error,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  } = useUserTable();

  return (
    <div className="relative min-h-[260px] pt-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 justify-between  mb-4">
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <XlsButtonBtn filename="participantes" data={listJSON} />
      </div>
      <ErrorAlert error={error} />
      <div className="max-w-7xl mx-auto  overflow-x-auto shadow-lg">
        <table className="w-full  border border-gray-100 shadow border-spacing-0 text-sm ">
          <thead className="border-b bg-gray-100 border-gray-300 align-top text-left">
            <tr>
              <Th value="name" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.name" />
              </Th>
              <Th value="location" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.location" />
              </Th>
              <Th value="items" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.items" />
              </Th>
              <Th value="commitment_datetime" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.commitment_datetime" />
              </Th>
              <Th value="commitment" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.commitment" />
              </Th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {list.map((user) => {
              const {
                id,
                avatar,
                first_name,
                last_name,
                location,
                items,
                commitment_datetime,
                commitment,
              } = user;
              return (
                <tr
                  key={id}
                  className={clsx(
                    "border-b border-gray-400 transition-colors",
                    {
                      "bg-success/30 hover:bg-success/60": commitment,
                      "bg-danger/30 hover:bg-danger/50": !commitment,
                    }
                  )}
                >
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div>
                        <Avatar avatar={avatar} />
                      </div>
                      <div className="">{`${first_name} ${last_name}`}</div>
                    </div>
                  </td>
                  <td className="p-2">{location?.name}</td>
                  <td className="p-2">{items || "0"}</td>
                  <td className="p-2">
                    {commitment_datetime
                      ? DateIntlFormat(commitment_datetime)
                      : "-"}
                  </td>
                  <td className="p-2">
                    {commitment ? <I18N id="Yes" /> : <I18N id="No" />}
                  </td>
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
export default UserTable;
