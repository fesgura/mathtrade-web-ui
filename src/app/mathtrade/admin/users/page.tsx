"use client";
import Link from "next/link";
import clsx from "clsx";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import EmptyList from "@/components/emptyList";
import XlsButton from "@/components/xlsButton";
import I18N, { getI18Ntext } from "@/i18n";
import { PRIVATE_ROUTES } from "@/config/routes";
import { whatsappLink } from "@/utils/whatsapp";
import useAdminUsers, { AdminUserRow } from "./useAdminUsers";

const selectClass =
  "border border-stroke rounded-md p-2 text-sm bg-white w-full sm:w-auto max-w-full min-w-0";

const STATUS_COLORS: Record<AdminUserRow["contribution_status"], string> = {
  missing: "bg-gray-100 text-gray-700",
  pending: "bg-sky-100 text-sky-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const tgLink = (telegram: string) => `https://t.me/${telegram.replace(/^@/, "")}`;

const hasNoContact = (row: AdminUserRow) => !row.whatsapp && !row.telegram;

// Flat rows for the Excel download: what is on screen, with the filters applied.
const toExport = (list: AdminUserRow[]) =>
  list.map((row) => ({
    Nombre: row.first_name,
    Apellido: row.last_name,
    Usuario: row.username,
    Email: row.email,
    Teléfono: row.phone || "",
    WhatsApp: row.whatsapp || "",
    Telegram: row.telegram || "",
    "Sin contacto": hasNoContact(row) ? "Sí" : "No",
    BGG: row.bgg_user || "",
    Ciudad: row.location || "",
    "Referido por": row.referring || "",
    Ejemplares: row.copies,
    Aporte: getI18Ntext(`adminUsers.status.${row.contribution_status}`),
    Autoexcluido: row.self_excluded ? "Sí" : "No",
    Confirmó: row.commitment ? "Sí" : "No",
    Roles: row.roles.map((role) => getI18Ntext(`adminUsers.role.${role}`)).join(", "),
  }));

// Admins only (route "onlyForAdmin", endpoint IsAdminAuthenticated): every
// member of the active edition, with contacts, city, copies and contribution
// state. "Sin contacto" lists who sees the red contact banner.
const AdminUsersPage = () => {
  const {
    list,
    loading,
    error,
    search,
    setSearch,
    contact,
    setContact,
    status,
    setStatus,
    location,
    setLocation,
    locations,
  } = useAdminUsers();

  const quickButton = (active: boolean) =>
    clsx(
      "rounded-full text-sm font-semibold px-4 py-1.5 border",
      active
        ? "bg-primary text-white border-primary"
        : "bg-white text-primary border-primary hover:bg-primary/10"
    );

  return (
    <>
      <PageHeader title="adminUsers.title" variant="minimal" />
      <SectionCommon loading={loading}>
        <div className="md:px-7 px-3 py-7">
          <div className="mb-4">
            <Link href={PRIVATE_ROUTES.ADMIN_PANEL.path} className="text-primary underline">
              <I18N id="adminUsers.back" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <button
              type="button"
              className={quickButton(contact === "")}
              onClick={() => setContact("")}
            >
              <I18N id="adminUsers.quick.all" />
            </button>
            <button
              type="button"
              className={quickButton(contact === "missing")}
              onClick={() => setContact("missing")}
            >
              <I18N id="adminUsers.quick.noContact" />
            </button>
            {contact === "missing" ? (
              <span className="text-xs text-gray-500">
                <I18N id="adminUsers.quick.noContactHelp" />
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-end gap-3 mb-4">
            <input
              type="search"
              className="border border-stroke rounded-md p-2 text-sm w-full sm:w-72"
              placeholder={getI18Ntext("adminUsers.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <label className="text-xs text-gray-500 flex flex-col gap-1 w-full sm:w-auto">
              <I18N id="adminUsers.filter.contact" />
              <select
                className={selectClass}
                value={contact}
                onChange={(e) => setContact(e.target.value as typeof contact)}
              >
                <option value="">{getI18Ntext("adminUsers.contact.all")}</option>
                <option value="missing">{getI18Ntext("adminUsers.contact.missing")}</option>
                <option value="partial">{getI18Ntext("adminUsers.contact.partial")}</option>
              </select>
            </label>
            <label className="text-xs text-gray-500 flex flex-col gap-1 w-full sm:w-auto">
              <I18N id="adminUsers.filter.status" />
              <select
                className={selectClass}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">{getI18Ntext("adminUsers.status.all")}</option>
                {["missing", "pending", "approved", "rejected"].map((value) => (
                  <option key={value} value={value}>
                    {getI18Ntext(`adminUsers.status.${value}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs text-gray-500 flex flex-col gap-1 w-full sm:w-auto">
              <I18N id="adminUsers.filter.city" />
              <select
                className={selectClass}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">{getI18Ntext("adminUsers.city.all")}</option>
                {locations.map(({ id, name }) => (
                  <option key={id} value={String(id)}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <ErrorAlert error={error} />

          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="font-semibold">
              <I18N
                id={list.length === 1 ? "adminUsers.count.one" : "adminUsers.count"}
                values={[list.length]}
              />
            </div>
            {list.length ? (
              <XlsButton
                data={toExport(list)}
                filename={contact === "missing" ? "usuarios-sin-contacto" : "usuarios"}
                className=""
              />
            ) : null}
          </div>

          {!loading && !list.length ? (
            <EmptyList visible icon="status-box" message="adminUsers.none" />
          ) : null}
          {list.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="py-2 pr-4"><I18N id="adminUsers.col.name" /></th>
                    <th className="py-2 pr-4"><I18N id="adminUsers.col.city" /></th>
                    <th className="py-2 pr-4"><I18N id="adminUsers.col.contact" /></th>
                    <th className="py-2 pr-4"><I18N id="adminUsers.col.referring" /></th>
                    <th className="py-2 pr-4 text-right"><I18N id="adminUsers.col.copies" /></th>
                    <th className="py-2 pr-4"><I18N id="adminUsers.col.status" /></th>
                    <th className="py-2"><I18N id="adminUsers.col.flags" /></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((row) => (
                    <tr key={row.user_id} className="border-b border-gray-100 align-top">
                      <td className="py-2 pr-4">
                        <div className="font-semibold">
                          {row.first_name} {row.last_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {row.username}
                          {row.email ? ` · ${row.email}` : ""}
                        </div>
                      </td>
                      <td className="py-2 pr-4">{row.location || "-"}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {hasNoContact(row) ? (
                          <span className="text-red-600 font-semibold">
                            <I18N id="adminUsers.noContact" />
                          </span>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            {row.whatsapp ? (
                              <a
                                href={whatsappLink(row.whatsapp)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                              >
                                WA {row.whatsapp}
                              </a>
                            ) : null}
                            {row.telegram ? (
                              <a
                                href={tgLink(row.telegram)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                              >
                                TG {row.telegram}
                              </a>
                            ) : null}
                          </div>
                        )}
                        {/* WhatsApp = the phone; show the phone only when it differs. */}
                        {row.phone && row.phone !== row.whatsapp ? (
                          <div className="text-xs text-gray-500">{row.phone}</div>
                        ) : null}
                      </td>
                      <td className="py-2 pr-4">{row.referring || "-"}</td>
                      <td className="py-2 pr-4 text-right">{row.copies}</td>
                      <td className="py-2 pr-4">
                        <span
                          className={clsx(
                            "inline-block rounded-full text-xs font-semibold px-2 py-0.5 whitespace-nowrap",
                            STATUS_COLORS[row.contribution_status]
                          )}
                        >
                          <I18N id={`adminUsers.status.${row.contribution_status}`} />
                        </span>
                      </td>
                      <td className="py-2 text-xs">
                        <div className="flex flex-wrap gap-1">
                          {row.roles.map((role) => (
                            <span key={role} className="rounded bg-gray-100 px-1.5 py-0.5">
                              <I18N id={`adminUsers.role.${role}`} />
                            </span>
                          ))}
                          {row.self_excluded ? (
                            <span className="rounded bg-red-100 text-red-800 px-1.5 py-0.5">
                              <I18N id="adminUsers.flag.selfExcluded" />
                            </span>
                          ) : null}
                          {row.commitment ? (
                            <span className="rounded bg-green-100 text-green-800 px-1.5 py-0.5">
                              <I18N id="adminUsers.flag.committed" />
                            </span>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </SectionCommon>
    </>
  );
};

export default AdminUsersPage;
