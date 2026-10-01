"use client";
import useFooter from "./useFooter";
import OrderBy from "@/components/orderBy";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import AutocompleteButton from "./autocomplete";
import { LoadingBox } from "@/components/loading";
import Wrapper from "@/components/wrapper";
import ListToolbar from "@/components/list-toolbar";
import ListSearch from "@/components/list-toolbar/search";
import { useOptions } from "@/store";
import { useContext } from "react";
import { GotoTopContext } from "@/context/goto-top";
import { PageContext } from "@/context/page";
import useSidebarNav from "@/components/sidebar/useSidebarNav";
import LeavePageGuard from "@/components/leave-page-guard";

const Footer = () => {
  const { emptyWants, enabledBtn, changesCount, onClick, loading } =
    useFooter();
  const { gotoTop } = useContext(GotoTopContext);
  const { isUserEarlyPay } = useContext(PageContext);
  const { collapsed } = useSidebarNav();
  const filters = useOptions((state) => state.filters_wants);
  const updateFilters = useOptions((state) => state.updateFilters);
  const showClearHint = Boolean(!isUserEarlyPay && filters?.keyword);

  // Ask before leaving with unsaved changes (links, back, refresh).
  const leaveGuard = <LeavePageGuard when={changesCount > 0} />;

  if (emptyWants) {
    return leaveGuard;
  }
  return (
    <>
      {leaveGuard}
      {loading ? null : (
        <div
          className={clsx(
            "fixed z-nav right-0 left-0 pb-3 transition-[left] duration-300 ease-out motion-reduce:transition-none",
            "bottom-[calc(3.5rem+env(safe-area-inset-bottom))] lg:bottom-0",
            collapsed ? "lg:left-[76px]" : "lg:left-[260px]"
          )}
        >
          <Wrapper>
            {showClearHint ? (
              <div className="mb-2 px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2.5">
                <p className="text-sm font-semibold text-amber-950 leading-snug flex-1 min-w-0">
                  <I18N id="CommitFooterVisual.clearFilter" />
                </p>
                <button
                  type="button"
                  className="shrink-0 h-8 px-3 rounded-full bg-white border border-amber-300 text-caption font-bold text-amber-950 hover:bg-amber-100"
                  onClick={() => {
                    gotoTop();
                    updateFilters({ keyword: undefined }, "wants");
                  }}
                >
                  <I18N id="CommitFooterVisual.clearFilter.btn" />
                </button>
              </div>
            ) : null}
            <ListToolbar
              className="rounded-main border border-gray-200 shadow-sm max-w-full min-w-0"
              search={
                <ListSearch
                  value={filters?.keyword || ""}
                  onChange={(keyword) => {
                    gotoTop();
                    updateFilters(
                      { keyword: keyword || undefined },
                      "wants"
                    );
                  }}
                />
              }
              sort={
                <OrderBy
                  type="wants"
                  options={[
                    { text: getI18Ntext("element.Type"), value: "type" },
                    { text: getI18Ntext("element.Name"), value: "name" },
                    { text: getI18Ntext("element.Value"), value: "value" },
                    {
                      text: getI18Ntext("element.MostWanted"),
                      value: "most_wanted",
                    },
                  ]}
                />
              }
              trailing={
                <>
                  <AutocompleteButton />
                  {changesCount > 0 ? (
                    <span className="text-amber-700 text-caption font-semibold hidden md:block whitespace-nowrap">
                      <I18N
                        id={
                          changesCount === 1
                            ? "MyWants.unsavedChanges.1"
                            : "MyWants.unsavedChanges.more"
                        }
                        values={[changesCount]}
                      />
                    </span>
                  ) : null}
                  <button
                    type="button"
                    className={clsx(
                      "h-[34px] rounded-full outline-none transition-colors px-4 text-body font-bold whitespace-nowrap",
                      enabledBtn
                        ? "bg-want text-white hover:opacity-80"
                        : "bg-gray-200 text-gray-400"
                    )}
                    onClick={onClick}
                    disabled={!enabledBtn}
                  >
                    <I18N id="MyWants.btn.Save" />
                  </button>
                </>
              }
            />
          </Wrapper>
        </div>
      )}
      <LoadingBox loading={loading} />
    </>
  );
};

export default Footer;
