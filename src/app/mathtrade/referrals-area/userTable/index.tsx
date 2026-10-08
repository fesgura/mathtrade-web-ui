import { useMemo } from "react";
import I18N from "@/i18n";
import useUserTable from "./useUserTable";
import Table from "@/components/table";
import { Switch } from "@/components/form";
import columns, { cityColumn } from "./columns";

const UserTable = () => {
  const {
    list,
    loading,
    error,
    cityName,
    showOnlyCommiters,
    setShowOnlyCommiters,
    isAdmin,
    allLocations,
    setAllLocations,
  } = useUserTable();

  // With every city listed, a column says where each member is.
  const tableColumns = useMemo(
    () =>
      allLocations ? [columns[0], cityColumn, ...columns.slice(1)] : columns,
    [allLocations]
  );

  return (
    <div className="relative min-h-[260px]">
      <div className="pt-8 pb-3 px-5 mb-5 flex flex-wrap gap-5 items-center justify-between border-b border-gray-400">
        <h2 className="text-2xl font-bold text-balance">
          <I18N id="referral-area.usertitle" values={[cityName]} />
        </h2>
      </div>
      <Table
        header={
          <div className="sm:pr-4 sm:border-r sm:border-gray-400 flex flex-wrap items-center gap-x-5 gap-y-2">
            {isAdmin ? (
              <Switch
                name="allLocations"
                data={{ allLocations }}
                onChange={(checked) => setAllLocations(checked)}
              >
                <span className="text-sm">
                  <I18N id="referral.users.allLocations" />
                </span>
              </Switch>
            ) : null}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-gray-300 rounded-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                checked={showOnlyCommiters}
                onChange={(e) => {
                  setShowOnlyCommiters(e.target.checked);
                }}
              />
              <I18N id="referral.users.showOnlyCommiters" />
            </label>
          </div>
        }
        loading={loading}
        error={error}
        columns={tableColumns}
        data={list}
        downloadExcel={`usuarios-${allLocations ? "todas" : cityName}`}
        searchValuesFunc={(user) => {
          const { first_name, last_name, email, telegram, bgg_user } = user;

          return `${first_name || ""} ${last_name || ""} ${email || ""} ${
            telegram || ""
          } ${bgg_user || ""}`;
        }}
        rowsProps={(item) => {
          return {
            style: {
              backgroundColor: item?.paid ? "#c3ffc3" : "#ffc2c2",
            },
          };
        }}
      />
    </div>
  );
};
export default UserTable;
