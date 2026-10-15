"use client";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import EmptyList from "@/components/emptyList";
import ConfirmModal from "@/components/confirmModal";
import I18N, { getI18Ntext } from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { PRIVATE_ROUTES } from "@/config/routes";
import { whatsappLink } from "@/utils/whatsapp";
import { AdminUserName, useAdminUser } from "@/components/adminUserModal";
import { ReplyBox } from "@/components/item/item-my/item-ui/reportThread";
import { PageContext } from "@/context/page";
import { REPORT_PARAM, clearReportParam } from "@/components/reportModal/useReportFromUrl";
import {
  clearAdminReportFocus,
  focusAdminReport,
  useAdminReportFocus,
} from "@/components/reportModal/adminReportFocus";

type Person = { id: number; first_name: string; last_name: string } | null;

type ItemElement = {
  name: string;
  thumbnail: string | null;
  box_status: string;
  component_status: string;
  comment: string;
  images: string;
};

type ItemDetail = {
  id: number;
  title: string;
  owner:
    | (Person & {
        username: string;
        whatsapp?: string | null;
        telegram?: string | null;
      })
    | null;
  location: string | null;
  elements: ItemElement[];
} | null;

type ReportComment = {
  id: number;
  user_info: Person;
  comment: string;
  created: string;
};

type ReportRow = {
  id: number;
  user: Person;
  reported_user: Person;
  item_title: string | null;
  item_detail: ItemDetail;
  images: string | null;
  comments: ReportComment[];
  assigned_trade_code: string | number | null;
  box: number | null;
  box_number: number | null;
  box_origin_name: string | null;
  box_destination_name: string | null;
  found_in_box_number: number | null;
  comment: string;
  created: string;
  resolved_at: string | null;
  // "logistics" reports (or any with a box) stay hidden from the item owner
  // until an admin shares them.
  source?: string;
  shared_with_owner_at?: string | null;
  // Owner activity after the report (BE: item last_update / owner comments).
  edited_after_report?: boolean;
  owner_replied?: boolean;
  // "withdrawn" when the owner withdrew the item (auto-resolved).
  resolution?: string | null;
};

const isInternal = (row: ReportRow) =>
  !!row.item_detail && (row.source === "logistics" || !!row.box);

// Next to the "Enviar al dueño" button: what went wrong, in plain words.
const shareErrorKey = (error: any): string => {
  if (error?.status === 403) return "adminReports.shareErrorForbidden";
  if (error?.status === 400 && error?.data?.item) return "adminReports.shareErrorNoItem";
  return "adminReports.shareError";
};

const FILTERS = [
  { key: "open", label: "adminReports.filter.open", resolved: "0" },
  { key: "resolved", label: "adminReports.filter.resolved", resolved: "1" },
  { key: "all", label: "adminReports.filter.all", resolved: undefined },
];

const fullName = (person: Person) =>
  person ? `${person.first_name} ${person.last_name}`.trim() : "-";

// Comma-separated photo URLs (report and copy photos), as thumbnails that
// open the full photo.
const Photos = ({ images }: { images?: string | null }) => {
  const urls = (images || "").split(",").map((url) => url.trim()).filter(Boolean);
  if (!urls.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {urls.map((url) => (
        <a key={url} href={url} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            className="w-20 h-20 object-cover rounded border border-gray-200 hover:opacity-80"
          />
        </a>
      ))}
    </div>
  );
};

const Label = ({ id }: { id: string }) => (
  <div className="text-xs font-bold uppercase text-gray-500 mb-1">
    <I18N id={id} />
  </div>
);

// Admins only (route "onlyForAdmin"): the edition's item, user and box
// reports, the same ones volunteers see in the logistics app.
const AdminReportsPage = () => {
  const { isNewUser } = useAdminUser();
  const { setItemPreviewId, setShowModalPreview } = useContext(PageContext);
  const [filter, setFilter] = useState("open");
  const [reloadValue, setReloadValue] = useState(0);
  const reload = useCallback(() => setReloadValue((v) => v + 1), []);

  const params = useMemo(() => {
    const resolved = FILTERS.find((f) => f.key === filter)?.resolved;
    return { event: "1", ...(resolved ? { resolved } : {}) };
  }, [filter]);

  // Which params the list on screen was loaded with: the deep link below
  // must not conclude "not in the list" from the previous filter's rows.
  const paramsKey = JSON.stringify(params);
  const paramsKeyRef = useRef(paramsKey);
  paramsKeyRef.current = paramsKey;
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const onListLoaded = useCallback(() => setLoadedKey(paramsKeyRef.current), []);

  const [, rows, loading, error] = useFetch({
    endpoint: "ADMIN_GET_REPORTS",
    initialState: [],
    params,
    autoLoad: true,
    reloadValue,
    afterLoad: onListLoaded,
  });
  const list: ReportRow[] = useMemo(
    () => (Array.isArray(rows) ? rows : rows?.results || []),
    [rows]
  );
  const listReady = !loading && loadedKey === paramsKey;

  /* DEEP LINK: ?report=<id> ("Ver reporte" for admins) *******************/
  // The list loads asynchronously and only holds the current filter's
  // reports of the active edition. Once it's loaded: if the report is there,
  // scroll to it and highlight it; if not, fetch it, switch to its status
  // filter and look again; if it still isn't listed (another edition), show
  // it on its own above the list; if it doesn't exist, say so.
  const focus = useAdminReportFocus();
  const [targetId, setTargetId] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<{ id: number; seq: number } | null>(null);
  const [pinned, setPinned] = useState<ReportRow | null>(null);
  const [notFoundId, setNotFoundId] = useState<number | null>(null);
  const [retry, setRetry] = useState(0);
  // The single-report fetch for the target: row undefined while loading.
  const singleRef = useRef<{ id: number; row?: ReportRow } | null>(null);

  const [getReport] = useFetch({ endpoint: "ADMIN_GET_REPORT" });

  // A full page load: read the URL once (no useSearchParams, see
  // reportModal/useReportFromUrl). Links from inside the app also set the
  // focus store, which covers soft navigations to this same page.
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get(REPORT_PARAM);
    if (raw === null) return;
    const id = /^\d+$/.test(raw.trim()) ? Number(raw.trim()) : 0;
    if (id) focusAdminReport(id);
    else clearReportParam();
  }, []);

  useEffect(() => {
    if (!focus.id) return;
    clearAdminReportFocus();
    singleRef.current = null;
    setNotFoundId(null);
    setPinned((current) => (current?.id === focus.id ? current : null));
    setTargetId(focus.id);
  }, [focus]);

  useEffect(() => {
    if (!targetId || !listReady) return;
    if (list.some((row) => row.id === targetId) || pinned?.id === targetId) {
      setHighlight((current) => ({ id: targetId, seq: (current?.seq || 0) + 1 }));
      setTargetId(null);
      clearReportParam();
      return;
    }
    const single = singleRef.current;
    if (single?.id === targetId) {
      if (!single.row) return; // still loading
      // Its status filter is on and it still isn't listed: another edition.
      setPinned(single.row);
      return;
    }
    singleRef.current = { id: targetId };
    getReport({ urlParams: [targetId] }).then((row?: ReportRow) => {
      if (singleRef.current?.id !== targetId) return;
      if (!row?.id) {
        singleRef.current = null;
        setNotFoundId(targetId);
        setTargetId(null);
        clearReportParam();
        return;
      }
      singleRef.current = { id: targetId, row };
      const wanted = row.resolved_at ? "resolved" : "open";
      if (filter !== "all" && filter !== wanted) setFilter(wanted);
      else setRetry((v) => v + 1);
    });
  }, [targetId, listReady, list, pinned, filter, getReport, retry]);

  useEffect(() => {
    if (!highlight) return;
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(`report-${highlight.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    const timer = setTimeout(() => setHighlight(null), 3000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [highlight]);

  const [resolveReport, , resolving, errorResolve] = useFetch({
    endpoint: "ADMIN_RESOLVE_REPORT",
    method: "POST",
    afterLoad: reload,
  });
  const [deleteReport, , deleting, errorDelete] = useFetch({
    endpoint: "ADMIN_DELETE_REPORT",
    method: "DELETE",
    afterLoad: reload,
  });
  const [toDelete, setToDelete] = useState<number | null>(null);
  const [shareReport, , sharing, errorShare] = useFetch({
    endpoint: "ADMIN_SHARE_REPORT",
    method: "POST",
    afterLoad: reload,
  });
  const [toShare, setToShare] = useState<number | null>(null);
  // The row of the last share attempt, so its error shows next to its button.
  const [sharedRowId, setSharedRowId] = useState<number | null>(null);

  const renderRow = (row: ReportRow) => (
    <article
      key={row.id}
      id={`report-${row.id}`}
      className={clsx(
        "border rounded-lg p-4 transition-colors duration-700",
        highlight?.id === row.id
          ? "border-primary ring-2 ring-primary bg-sky-50"
          : "border-gray-200 bg-white"
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="text-sm">
          <span className="font-semibold">#{row.id}</span> · {row.created} ·{" "}
          <I18N id="adminReports.col.by" />: <strong><AdminUserName userId={row.user?.id}>{fullName(row.user)}</AdminUserName></strong>
          <div className="mt-1">
            {row.resolved_at ? (
              <span className="text-green-700">
                <I18N id="adminReports.resolvedAt" values={[row.resolved_at]} />
                {row.resolution === "withdrawn" ? (
                  <>
                    {" · "}
                    <I18N id="adminReports.resolution.withdrawn" />
                  </>
                ) : null}
              </span>
            ) : (
              <span className="text-danger font-semibold">
                <I18N id="adminReports.open" />
              </span>
            )}
            {isInternal(row) ? (
              row.shared_with_owner_at ? (
                <span className="ml-2 text-xs text-gray-600">
                  <I18N id="adminReports.sharedAt" values={[row.shared_with_owner_at]} />
                </span>
              ) : (
                <span
                  className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900"
                  title={getI18Ntext("adminReports.internalHint")}
                >
                  <I18N id="adminReports.internal" />
                </span>
              )
            ) : null}
          </div>
        </div>
        <div className="whitespace-nowrap">
          {isInternal(row) && !row.shared_with_owner_at ? (
            <button
              type="button"
              onClick={() => setToShare(row.id)}
              className="rounded-full border border-primary text-primary text-xs font-semibold px-3 py-1.5 hover:bg-primary hover:text-white mr-2"
            >
              <I18N id="adminReports.shareWithOwner" />
            </button>
          ) : null}
          {!row.resolved_at ? (
            <button
              type="button"
              onClick={() => resolveReport({ urlParams: [row.id] })}
              className="rounded-full bg-primary text-white text-xs font-semibold px-3 py-1.5 hover:opacity-90 mr-2"
            >
              <I18N id="adminReports.resolve" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setToDelete(row.id)}
            className="text-xs text-red-600 underline"
          >
            <I18N id="adminReports.delete" />
          </button>
        </div>
      </header>
      {errorShare && sharedRowId === row.id ? (
        <ErrorAlert error={errorShare} errorMessage={shareErrorKey(errorShare)} />
      ) : null}

      <section className="mb-3">
        <Label id="adminReports.col.comment" />
        <p className="text-sm whitespace-pre-line">{row.comment || "-"}</p>
        <Photos images={row.images} />
      </section>

      {row.item_detail ? (
        <section className="mb-3 rounded-md bg-gray-50 p-3">
          <Label id="adminReports.item" />
          <div className="text-sm mb-2">
            <button
              type="button"
              className="font-bold text-left underline decoration-dotted underline-offset-2 hover:text-primary"
              title={getI18Ntext("adminReports.openItem")}
              onClick={() => {
                // Admins can open the item even while it isn't ready.
                setItemPreviewId(row.item_detail?.id);
                setShowModalPreview(true);
              }}
            >
              {row.assigned_trade_code ? `${row.assigned_trade_code} - ` : ""}
              {row.item_detail.title}
            </button>
            {row.edited_after_report ? (
              <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900">
                <I18N id="adminReports.badge.edited" />
              </span>
            ) : null}
            {row.owner_replied ? (
              <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-900">
                <I18N id="adminReports.badge.ownerReplied" />
              </span>
            ) : null}
            {row.item_detail.owner ? (
              <>
                {" · "}
                <I18N id="adminReports.owner" />:{" "}
                <AdminUserName userId={row.item_detail.owner.id}>{fullName(row.item_detail.owner)}</AdminUserName> (
                {row.item_detail.owner.username})
                {row.item_detail.owner.whatsapp ? (
                  <a
                    className="ml-2 underline text-primary"
                    target="_blank"
                    rel="noreferrer"
                    href={whatsappLink(row.item_detail.owner.whatsapp)}
                  >
                    WhatsApp
                  </a>
                ) : null}
                {row.item_detail.owner.telegram ? (
                  <a
                    className="ml-2 underline text-primary"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://t.me/${row.item_detail.owner.telegram.replace(/^@/, "")}`}
                  >
                    Telegram
                  </a>
                ) : null}
              </>
            ) : null}
            {row.item_detail.location ? ` · ${row.item_detail.location}` : ""}
          </div>
          {row.item_detail.elements.map((element, k) => (
            <div key={k} className="flex gap-3 py-2 border-t border-gray-200 first:border-t-0">
              {element.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={element.thumbnail}
                  alt=""
                  className="w-14 h-14 object-contain shrink-0"
                />
              ) : null}
              <div className="text-sm min-w-0">
                <div className="font-semibold">{element.name}</div>
                <div className="text-xs text-gray-600">
                  <I18N id="adminReports.boxStatus" />: {getI18Ntext(`statusType.box.${element.box_status}`)}
                  {" · "}
                  <I18N id="adminReports.componentStatus" />:{" "}
                  {getI18Ntext(`statusType.components.${element.component_status}`)}
                </div>
                {element.comment ? (
                  <p className="text-gray-700 whitespace-pre-line mt-1">{element.comment}</p>
                ) : null}
                <Photos images={element.images} />
              </div>
            </div>
          ))}
        </section>
      ) : row.item_title ? (
        <section className="mb-3 text-sm">
          <Label id="adminReports.item" />
          {row.item_title}
        </section>
      ) : null}

      {row.reported_user ? (
        // The one single-user block of a report: the reported member.
        // Reporter/owner lines sit among other users, so only the
        // name and badge mark them.
        <section
          className={clsx("mb-3 text-sm", {
            "bg-violet-50 rounded-md px-1.5 -mx-1.5 py-0.5": isNewUser(row.reported_user.id),
          })}
        >
          <Label id="adminReports.user" />
          <AdminUserName userId={row.reported_user.id}>{fullName(row.reported_user)}</AdminUserName>
        </section>
      ) : null}

      {row.box_number ? (
        <section className="mb-3 text-sm">
          <I18N
            id="adminReports.box"
            values={[row.box_number, row.box_origin_name || "-", row.box_destination_name || "-"]}
          />
          {row.found_in_box_number ? (
            <div className="text-xs text-green-700">
              <I18N id="adminReports.foundIn" values={[row.found_in_box_number]} />
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="text-sm border-t border-gray-200 pt-2">
        <Label id={row.comments?.length ? "adminReports.thread" : "adminReports.reply"} />
        {(row.comments || []).map((c) => (
          <p key={c.id} className="mb-1">
            <strong><AdminUserName userId={c.user_info?.id}>{fullName(c.user_info)}</AdminUserName></strong> ({c.created}): {c.comment}
          </p>
        ))}
        <ReplyBox reportId={row.id} onSent={reload} />
      </section>
    </article>
  );

  return (
    <>
      <PageHeader title="adminReports.title" variant="minimal" />
      <SectionCommon loading={loading || resolving || deleting || sharing}>
        <div className="md:px-7 px-3 py-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Link href={PRIVATE_ROUTES.ADMIN_PANEL.path} className="text-primary underline">
              <I18N id="adminReports.back" />
            </Link>
            <div className="flex gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={
                    filter === f.key
                      ? "rounded-full bg-primary text-white text-xs font-semibold px-3 py-1.5"
                      : "rounded-full bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 hover:bg-gray-200"
                  }
                >
                  <I18N id={f.label} />
                </button>
              ))}
            </div>
          </div>
          <p className="mb-4 text-sm text-gray-600">
            <I18N id="adminReports.corridaHint" />
          </p>
          <ErrorAlert error={error || errorResolve || errorDelete} />
          {!loading && !list.length ? (
            <EmptyList visible icon="status-box" message="adminReports.none" />
          ) : null}
          {notFoundId ? (
            <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              <I18N id="adminReports.focus.notFound" values={[notFoundId]} />
            </div>
          ) : null}
          {pinned ? (
            <div className="mb-6">
              <p className="mb-2 text-sm text-gray-600">
                <I18N id="adminReports.focus.otherEdition" />
              </p>
              {renderRow(pinned)}
            </div>
          ) : null}
          {list.length ? (
            <div className="flex flex-col gap-4">
              {list.map((row) => renderRow(row))}
            </div>
          ) : null}
          <ConfirmModal
            isOpen={toDelete !== null}
            onCancel={() => setToDelete(null)}
            onConfirm={() => {
              const id = toDelete;
              setToDelete(null);
              if (id !== null) deleteReport({ urlParams: [id] });
            }}
            title="adminReports.deleteTitle"
            description="adminReports.deleteText"
          />
          <ConfirmModal
            isOpen={toShare !== null}
            onCancel={() => setToShare(null)}
            onConfirm={() => {
              const id = toShare;
              setToShare(null);
              if (id !== null) {
                setSharedRowId(id);
                shareReport({ urlParams: [id] });
              }
            }}
            title="adminReports.shareConfirmTitle"
            description="adminReports.shareConfirmText"
            confirmId="adminReports.shareWithOwner"
            variant="primary"
          />
        </div>
      </SectionCommon>
    </>
  );
};

export default AdminReportsPage;
