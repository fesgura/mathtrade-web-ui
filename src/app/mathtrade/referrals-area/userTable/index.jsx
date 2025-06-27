import I18N from "@/i18n";
import useUserTable from "./useUserTable";
import Table from "@/components/table";
import columns from "./columns";

const UserTable = () => {
  const { list, loading, error, cityName } = useUserTable();

  return (
    <div className="relative min-h-[260px]">
      <div className="pt-8 pb-3 px-5 mb-5 flex flex-wrap gap-5 items-center justify-between border-b border-gray-400">
        <h2 className="text-2xl font-bold text-balance">
          <I18N id="referral-area.usertitle" values={[cityName]} />
        </h2>
      </div>
      <Table
        loading={loading}
        error={error}
        columns={columns}
        data={list}
        downloadExcel={`usuarios-${cityName}`}
        searchValuesFunc={(user) => {
          const { first_name, last_name, email, telegram, bgg_user } = user;

          return `${first_name || ""} ${last_name || ""} ${email || ""} ${
            telegram || ""
          } ${bgg_user || ""}`;
        }}
      />
    </div>
  );
};
export default UserTable;
