"use client";
import Link from "next/link";
import clsx from "clsx";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import EmptyList from "@/components/emptyList";
import I18N from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { PRIVATE_ROUTES } from "@/config/routes";
import { AdminUserName, useAdminUser } from "@/components/adminUserModal";

type SelfExcludedRow = {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  location: string | null;
  self_excluded_at: string;
  reason: string;
  items_count: number;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "short",
    timeStyle: "short",
  });

// Admins only (route enabled: "onlyForAdmin", endpoint IsAdminAuthenticated):
// who self-excluded from the current edition, and a way to see the
// provisional results they saw.
const AdminSelfExcludedPage = () => {
  const { isNewUser } = useAdminUser();
  const [, rows, loading, error] = useFetch({
    endpoint: "GET_SELF_EXCLUDED",
    initialState: [],
    autoLoad: true,
  });
  const list: SelfExcludedRow[] = Array.isArray(rows) ? rows : [];

  return (
    <>
      <PageHeader title="adminSelfExcluded.title" variant="minimal" />
      <SectionCommon loading={loading}>
        <div className="md:px-7 px-3 py-7">
          <div className="mb-4">
            <Link
              href={PRIVATE_ROUTES.ADMIN_PANEL.path}
              className="text-primary underline"
            >
              <I18N id="adminSelfExcluded.back" />
            </Link>
          </div>
          <ErrorAlert error={error} />
          {!loading && !list.length ? (
            <EmptyList visible icon="status-box" message="adminSelfExcluded.none" />
          ) : null}
          {list.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="py-2 pr-4"><I18N id="adminSelfExcluded.col.name" /></th>
                    <th className="py-2 pr-4"><I18N id="adminSelfExcluded.col.city" /></th>
                    <th className="py-2 pr-4"><I18N id="adminSelfExcluded.col.date" /></th>
                    <th className="py-2 pr-4 text-right"><I18N id="adminSelfExcluded.col.items" /></th>
                    <th className="py-2 pr-4"><I18N id="adminSelfExcluded.col.reason" /></th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody>
                  {list.map((row) => (
                    <tr
                      key={row.user_id}
                      className={clsx("border-b border-gray-100", {
                        "bg-violet-50": isNewUser(row.user_id),
                      })}
                    >
                      <td className="py-2 pr-4">
                        <AdminUserName userId={row.user_id}>
                          <div className="font-semibold">
                            {row.first_name} {row.last_name}
                          </div>
                        </AdminUserName>
                        <div className="text-xs text-gray-500">{row.username}</div>
                      </td>
                      <td className="py-2 pr-4">{row.location || "-"}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {formatDate(row.self_excluded_at)}
                      </td>
                      <td className="py-2 pr-4 text-right">{row.items_count}</td>
                      <td className="py-2 pr-4 min-w-[14rem] max-w-md text-gray-700">
                        {row.reason ? (
                          <span className="whitespace-pre-line">{row.reason}</span>
                        ) : (
                          <span className="text-gray-400 italic">
                            <I18N id="adminSelfExcluded.noReason" />
                          </span>
                        )}
                      </td>
                      <td className="py-2 text-right">
                        <Link
                          href={`${PRIVATE_ROUTES.PROVISIONAL_RESULTS.path}?member=${row.user_id}`}
                          className="inline-block rounded-full bg-primary text-white text-xs font-semibold px-3 py-1.5 hover:opacity-90 whitespace-nowrap"
                        >
                          <I18N id="adminSelfExcluded.view" />
                        </Link>
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

export default AdminSelfExcludedPage;
