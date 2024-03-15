import I18N from "@/i18n";
import useBanUserList from "./useBanUserList";
import UserBanRow from "./userRow";
import { LoadingBox } from "@/components/loading";
import Icon from "@/components/icon";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import SearchUser from "./search";

const Th = ({ value, order, setOrder, children }) => {
  const dir = order.indexOf("-") === 0 ? -1 : 1;
  return (
    <th className="text-left py-2 px-3">
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

const BanUserList = ({ onClose }) => {
  const {
    userList,
    userBans,
    setUserBans,
    loading,
    error,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  } = useBanUserList();

  return (
    <div className="relative min-h-[260px]">
      <h2 className="mb-6 font-bold text-xl text-center">
        <I18N id="Users.List" />
      </h2>

      <div className="max-w-lg mx-auto">
        <p className=" text-sm text-center mb-4 text-balance">
          <I18N id="Users.List.ban.text" />
        </p>
        <ErrorAlert error={error} />
        <SearchUser searchValue={searchValue} setSearchValue={setSearchValue} />
        <table className="w-full  border border-gray-100 shadow border-spacing-0 text-sm ">
          <thead className="border-b bg-gray-100 border-gray-300 align-top">
            <tr>
              <Th value="name" order={order} setOrder={setOrder}>
                <I18N id="ban.table.name" />
              </Th>
              <Th value="location" order={order} setOrder={setOrder}>
                <I18N id="ban.table.location" />
              </Th>
              <Th value="status" order={order} setOrder={setOrder}>
                <I18N id="ban.table.status" />
              </Th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => {
              return (
                <UserBanRow
                  key={user.id}
                  user={user}
                  userBans={userBans}
                  setUserBans={setUserBans}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-center pt-8">
        <button
          className="border border-gray-400 py-2 px-7 rounded-full hover:bg-gray-400 hover:text-white shadow"
          onClick={onClose}
        >
          <I18N id="btn.Close" />
        </button>
      </div>
      <LoadingBox loading={loading} />
    </div>
  );
};

export default BanUserList;
