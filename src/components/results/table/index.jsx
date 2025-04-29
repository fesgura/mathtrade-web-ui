import I18N from "@/i18n";
import Icon from "@/components/icon";
import clsx from "clsx";
import Search from "./search";
import useTable from "./useTable";
import Row from "./row";

const Th = ({ value, order, setOrder, children, className }) => {
  const dir = order.indexOf("-") === 0 ? -1 : 1;
  return (
    <th className={clsx("text-left py-2 px-3", className)}>
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

const ResultsTable = () => {
  const { list, order, setOrder, searchValue, setSearchValue } = useTable();

  return (
    <div className="relative min-h-[260px]">
      <div className="max-w-7xl mx-auto">
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="max-w-7xl mx-auto  overflow-x-auto">
        <div className="min-w-[1000px]">
          <table className="w-full  border border-gray-100 shadow border-spacing-0 text-sm ">
            <thead className="border-b bg-gray-100 border-gray-300 align-top">
              <tr>
                <Th value="item_to" order={order} setOrder={setOrder}>
                  <I18N id="result.table.item_to" />
                </Th>
                <Th
                  value="member_to"
                  order={order}
                  setOrder={setOrder}
                  className="border-r-2 border-gray-300"
                >
                  <I18N id="result.table.member_to" />
                </Th>
                <Th value="item_from" order={order} setOrder={setOrder}>
                  <I18N id="result.table.item_from" />
                </Th>
                <Th value="member_from" order={order} setOrder={setOrder}>
                  <I18N id="result.table.member_from" />
                </Th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {list.map((result) => {
                return <Row result={result} key={result.id} />;
              })}
              {/* {userList.map((user) => {
              return (
                <UserBanRow
                  key={user.id}
                  user={user}
                  userBans={userBans}
                  setUserBans={setUserBans}
                />
              );
            })} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
