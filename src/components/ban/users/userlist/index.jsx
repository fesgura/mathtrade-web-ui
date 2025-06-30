import I18N from "@/i18n";
import useBanUserList from "./useBanUserList";
import Table from "@/components/table";
import columns from "./columns";
import getColumns from "./columns";

const BanUserList = ({ onClose }) => {
  const { userList, userBans, setUserBans, loading, error } = useBanUserList();

  return (
    <div className="relative min-h-[260px]">
      <h2 className="mb-6 font-bold text-xl text-center">
        <I18N id="Users.List" />
      </h2>

      <div className="max-w-lg mx-auto">
        <p className=" text-sm text-center mb-4 text-balance">
          <I18N id="Users.List.ban.text" />
        </p>
        <Table
          data={userList}
          columns={getColumns(userBans, setUserBans)}
          loading={loading}
          error={error}
          searchValuesFunc={(user) => {
            return `${user?.first_name || ""} ${user?.last_name || ""}`;
          }}
          downloadExcel="participantes-ignorados"
        />
      </div>
      <div className="text-center pt-8">
        <button
          className="border border-gray-400 py-2 px-7 rounded-full hover:bg-gray-400 hover:text-white shadow"
          onClick={onClose}
        >
          <I18N id="btn.Close" />
        </button>
      </div>
    </div>
  );
};

export default BanUserList;
