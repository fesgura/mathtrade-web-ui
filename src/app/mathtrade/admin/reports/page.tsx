"use client";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import EmptyList from "@/components/emptyList";
import ConfirmModal from "@/components/confirmModal";
import I18N, { getI18Ntext } from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { PRIVATE_ROUTES } from "@/config/routes";
import { whatsappLink } from "@/utils/whatsapp";

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
  box_number: number | null;
  box_origin_name: string | null;
  box_destination_name: string | null;
  found_in_box_number: number | null;
  comment: string;
  created: string;
  resolved_at: string | null;
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
  const [filter, setFilter] = useState("open");
  const [reloadValue, setReloadValue] = useState(0);
  const reload = useCallback(() => setReloadValue((v) => v + 1), []);

  const params = useMemo(() => {
    const resolved = FILTERS.find((f) => f.key === filter)?.resolved;
    return { event: "1", ...(resolved ? { resolved } : {}) };
  }, [filter]);

  const [, rows, loading, error] = useFetch({
    endpoint: "ADMIN_GET_REPORTS",
    initialState: [],
    params,
    autoLoad: true,
    reloadValue,
  });
  const list: ReportRow[] = Array.isArray(rows) ? rows : rows?.results || [];

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

  return (
    <>
      <PageHeader title="adminReports.title" variant="minimal" />
      <SectionCommon loading={loading || resolving || deleting}>
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
          {list.length ? (
            <div className="flex flex-col gap-4">
              {list.map((row) => (
                <article key={row.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <header className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="text-sm">
                      <span className="font-semibold">#{row.id}</span> · {row.created} ·{" "}
                      <I18N id="adminReports.col.by" />: <strong>{fullName(row.user)}</strong>
                      <div className="mt-1">
                        {row.resolved_at ? (
                          <span className="text-green-700">
                            <I18N id="adminReports.resolvedAt" values={[row.resolved_at]} />
                          </span>
                        ) : (
                          <span className="text-danger font-semibold">
                            <I18N id="adminReports.open" />
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="whitespace-nowrap">
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

                  <section className="mb-3">
                    <Label id="adminReports.col.comment" />
                    <p className="text-sm whitespace-pre-line">{row.comment || "-"}</p>
                    <Photos images={row.images} />
                  </section>

                  {row.item_detail ? (
                    <section className="mb-3 rounded-md bg-gray-50 p-3">
                      <Label id="adminReports.item" />
                      <div className="text-sm mb-2">
                        <strong>
                          {row.assigned_trade_code ? `${row.assigned_trade_code} - ` : ""}
                          {row.item_detail.title}
                        </strong>
                        {row.item_detail.owner ? (
                          <>
                            {" · "}
                            <I18N id="adminReports.owner" />: {fullName(row.item_detail.owner)} (
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
                    <section className="mb-3 text-sm">
                      <Label id="adminReports.user" />
                      {fullName(row.reported_user)}
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

                  {row.comments?.length ? (
                    <section className="text-sm border-t border-gray-200 pt-2">
                      <Label id="adminReports.thread" />
                      {row.comments.map((c) => (
                        <p key={c.id} className="mb-1">
                          <strong>{fullName(c.user_info)}</strong> ({c.created}): {c.comment}
                        </p>
                      ))}
                    </section>
                  ) : null}
                </article>
              ))}
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
        </div>
      </SectionCommon>
    </>
  );
};

export default AdminReportsPage;
