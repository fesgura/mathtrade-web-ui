import I18N, { getI18Ntext } from "@/i18n";
import useUserTable from "./useUserTable";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import { DateIntlFormat } from "@/utils/dateUtils";

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
        className="w-52 border border-stroke rounded-md p-1 text-xs focus:outline-none"
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
    loading,
    error,
    order,
    setOrder,
    searchValue,
    setSearchValue,
    cityName,
  } = useUserTable();

  return (
    <div className="relative min-h-[260px]">
      <div className="pt-8 pb-3 px-5 mb-5 flex flex-wrap gap-5 items-center justify-between border-b border-gray-400">
        <h2 className="text-2xl font-bold text-balance">
          <I18N id="referral-area.usertitle" values={[cityName]} />
        </h2>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <ErrorAlert error={error} />
      <div className="mx-auto  overflow-x-auto shadow-lg">
        <table className="w-full  border border-gray-100 shadow border-spacing-0 text-sm ">
          <thead className="border-b bg-gray-100 border-gray-300 align-center text-left">
            <tr>
              <Th value="name" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.name" />
              </Th>
              <Th value="phone" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.phone" />
              </Th>
              <Th value="telegram" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.telegram" />
              </Th>
              <Th value="email" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.email" />
              </Th>
              <Th value="bgg_user" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.bgg_user" />
              </Th>
              <Th value="items" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.items" />
              </Th>
              <Th value="trades" order={order} setOrder={setOrder}>
                <I18N id="result.userTable.trades" />
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
                items,
                trades,
                commitment_datetime,
                commitment,
                telegram,
                email,
                bgg_user,
                phone,
              } = user;

              const fueraMT = items === 0;
              return (
                <tr
                  key={id}
                  className={clsx(
                    "border-b border-gray-400 transition-colors",
                    {
                      "bg-success/30 hover:bg-success/60":
                        commitment && !fueraMT,
                      "bg-danger/30 hover:bg-danger/50":
                        !commitment && !fueraMT,
                    }
                  )}
                >
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <Avatar avatar={avatar} />
                      <div className="">
                        <div className="font-bold leading-none">{`${first_name} ${last_name}`}</div>

                        {fueraMT ? (
                          <div className="uppercase font-bold leading-none text-xs text-red-600">
                            Fuera del MT
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    {phone ? (
                      <a
                        href={`tel:${phone}`}
                        className="text-sky-700 underline font-bold"
                      >
                        {phone}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2">
                    {telegram ? (
                      <a
                        href={`https://t.me/${telegram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-700 underline font-bold"
                      >
                        {telegram}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2">
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="text-sky-700 underline font-bold"
                      >
                        {email}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2">
                    {telegram ? (
                      <a
                        href={`https://boardgamegeek.com/user/${bgg_user}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-700 underline font-bold"
                      >
                        {bgg_user}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-2">{items || "0"}</td>
                  <td className="p-2">{trades || "-"}</td>
                  <td className="p-2">
                    {commitment_datetime
                      ? DateIntlFormat(commitment_datetime)
                      : "-"}
                  </td>
                  <td className="p-2">
                    {fueraMT ? (
                      "-"
                    ) : commitment ? (
                      <I18N id="Yes" />
                    ) : (
                      <I18N id="No" />
                    )}
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
