"use client";
import I18N, { getI18Ntext } from "@/i18n";
import Avatar from "@/components/avatar";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import ListSearch from "@/components/list-toolbar/search";
import SortableTh from "@/components/sortableTable/sortableTh";
import useUserTable from "./useUserTable";
import { COLUMNS } from "./columns";

const selectClass =
  "border border-stroke rounded-md p-2 text-sm bg-white w-full sm:w-auto max-w-full min-w-0";

// Participants of the active edition: name search, city filter, sortable headers.
const UserTable = () => {
  const {
    rows,
    total,
    loading,
    error,
    search,
    setSearch,
    city,
    setCity,
    cities,
    sort,
    toggleSort,
  } = useUserTable();

  return (
    <div className="relative md:px-7 px-3 py-7 min-h-[200px]">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="w-full sm:w-72">
          <ListSearch
            value={search}
            onChange={setSearch}
            placeholder={getI18Ntext("result.userTable.search")}
          />
        </div>
        <select
          className={selectClass}
          aria-label={getI18Ntext("result.userTable.location")}
          value={city === "" ? "" : String(city)}
          onChange={(e) => setCity(e.target.value ? Number(e.target.value) : "")}
        >
          <option value="">{getI18Ntext("result.userTable.allCities")}</option>
          {cities.map(({ id, name }) => (
            <option key={id} value={String(id)}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <ErrorAlert error={error} />
      <LoadingBox loading={loading} transparent />

      {!loading && !error ? (
        <>
          <div className="font-semibold mb-2">
            <I18N id="result.userTable.count" values={[rows.length, total]} />
          </div>
          {rows.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-stroke">
                    {COLUMNS.map(({ key, labelId, className }) => (
                      <SortableTh
                        key={key}
                        sortKey={key}
                        labelId={labelId}
                        sort={sort}
                        onSort={toggleSort}
                        helpId="result.userTable.sortHelp"
                        className={className}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-stroke align-middle">
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="shrink-0">
                            <Avatar avatar={row.avatar} first_name={row.first_name} />
                          </div>
                          <span className="font-semibold">
                            {`${row.first_name} ${row.last_name}`.trim()}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 pr-4">{row.location?.name || "-"}</td>
                      <td className="py-2 pr-4 text-right">{row.ready_items ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 py-6 text-center">
              <I18N id="result.userTable.empty" />
            </p>
          )}
        </>
      ) : null}
    </div>
  );
};

export default UserTable;
