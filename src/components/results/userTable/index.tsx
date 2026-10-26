"use client";
import I18N, { getI18Ntext } from "@/i18n";
import Avatar from "@/components/avatar";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import ListSearch from "@/components/list-toolbar/search";
import SortableTh from "@/components/sortableTable/sortableTh";
import useUserTable, { type CommitFilter } from "./useUserTable";
import { visibleColumns } from "./columns";
import CommitmentPill from "./commitmentPill";
import ParticipantCard from "./participantCard";
import MobileSort from "./mobileSort";

const selectClass =
  "border border-stroke rounded-md p-2 text-sm bg-white w-full sm:w-auto max-w-full min-w-0";

const COMMIT_FILTERS: CommitFilter[] = ["all", "yes", "no"];

/* Participants of the active edition: name search, city and commitment
 * filters, sortable headers. ¿Comprometió? shows from the want phase on and
 * Intercambios once results are out. Below sm: cards + a sort select. */
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
    showCommitment,
    showTrades,
    commitFilter,
    setCommitFilter,
    sort,
    setSort,
    toggleSort,
  } = useUserTable();
  const columns = visibleColumns(showCommitment, showTrades);

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
        {showCommitment ? (
          <select
            className={selectClass}
            aria-label={getI18Ntext("result.userTable.commitment")}
            value={commitFilter}
            onChange={(e) => setCommitFilter(e.target.value as CommitFilter)}
          >
            {COMMIT_FILTERS.map((value) => (
              <option key={value} value={value}>
                {getI18Ntext(`result.userTable.commitFilter.${value}`)}
              </option>
            ))}
          </select>
        ) : null}
        <MobileSort columns={columns} sort={sort} setSort={setSort} />
      </div>

      <ErrorAlert error={error} />
      <LoadingBox loading={loading} transparent />

      {!loading && !error ? (
        <>
          <div className="font-semibold mb-2">
            <I18N id="result.userTable.count" values={[rows.length, total]} />
          </div>
          {rows.length ? (
            <>
              <ul className="sm:hidden flex flex-col gap-2">
                {rows.map((row) => (
                  <ParticipantCard
                    key={row.id}
                    row={row}
                    showCommitment={showCommitment}
                    showTrades={showTrades}
                  />
                ))}
              </ul>
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-stroke">
                      {columns.map(({ key, labelId, className }) => (
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
                        {showCommitment ? (
                          <td className="py-2 pr-4">
                            <CommitmentPill commitment={row.commitment} />
                          </td>
                        ) : null}
                        {showTrades ? (
                          <td className="py-2 pr-4 text-right">{row.trades ?? 0}</td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
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
