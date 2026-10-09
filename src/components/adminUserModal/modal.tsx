"use client";
import { useMemo, useState, type ReactNode } from "react";
import clsx from "clsx";
import Modal from "@/components/modal";
import Avatar from "@/components/avatar";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import I18N from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { whatsappLink } from "@/utils/whatsapp";
import type { AdminUserRow } from "@/app/mathtrade/admin/users/useAdminUsers";
import { readyCopies } from "@/app/mathtrade/admin/users/useSortedRows";
import Copies from "@/app/mathtrade/admin/users/copies";
import AdminUserItems from "./items";

const STATUS_COLORS: Record<AdminUserRow["contribution_status"], string> = {
  missing: "bg-gray-100 text-gray-700",
  pending: "bg-sky-100 text-sky-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const linkClass = "text-primary underline break-all";

const Row = ({ label = "", children = null }: { label?: string; children?: ReactNode }) => (
  <div className="flex gap-3 py-1.5 border-b border-gray-100 text-sm">
    <div className="w-32 shrink-0 text-gray-500">
      <I18N id={label} />
    </div>
    <div className="min-w-0 break-words">{children}</div>
  </div>
);

const Detail = ({ user, initialSection }: { user: AdminUserRow; initialSection?: "items" }) => {
  const [showItems, setShowItems] = useState(initialSection === "items");
  const wa = whatsappLink(user.whatsapp);
  const name = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 pr-8">
        <Avatar avatar={user.avatar} first_name={user.first_name || ""} width={56} />
        <div className="min-w-0">
          <h3 className="text-xl font-bold leading-tight break-words">{name}</h3>
          <div className="text-sm text-gray-500 break-all">{user.username}</div>
        </div>
      </div>

      <Row label="adminUserModal.email">
        {user.email ? (
          <a className={linkClass} href={`mailto:${user.email}`}>
            {user.email}
          </a>
        ) : (
          "-"
        )}
      </Row>
      <Row label="adminUserModal.phone">
        {user.phone || "-"}
        {wa ? (
          <a className={clsx(linkClass, "ml-2")} href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        ) : null}
      </Row>
      <Row label="adminUserModal.telegram">
        {user.telegram ? (
          <a
            className={linkClass}
            href={`https://t.me/${user.telegram.replace(/^@/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.telegram}
          </a>
        ) : (
          "-"
        )}
      </Row>
      <Row label="adminUserModal.bgg">
        {user.bgg_user ? (
          <a
            className={linkClass}
            href={`https://boardgamegeek.com/user/${user.bgg_user}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.bgg_user}
          </a>
        ) : (
          "-"
        )}
      </Row>
      <Row label="adminUsers.col.city">{user.location || "-"}</Row>
      <Row label="adminUsers.col.referring">{user.referring || "-"}</Row>
      <Row label="adminUsers.col.copies">
        <Copies
          ready={readyCopies(user)}
          total={user.copies}
          onClick={() => setShowItems((v) => !v)}
        />
      </Row>
      <Row label="adminUsers.col.status">
        <span
          className={clsx(
            "inline-block rounded-full text-xs font-semibold px-2 py-0.5 whitespace-nowrap",
            STATUS_COLORS[user.contribution_status]
          )}
        >
          <I18N id={`adminUsers.status.${user.contribution_status}`} />
        </span>
      </Row>
      <Row label="adminUsers.flag.selfExcluded">
        <I18N id={user.self_excluded ? "Yes" : "No"} />
      </Row>
      <Row label="adminUserModal.commitment">
        <I18N id={user.commitment ? "Yes" : "No"} />
      </Row>
      <Row label="adminUserModal.roles">
        {user.roles?.length ? (
          <div className="flex flex-wrap gap-1">
            {user.roles.map((role) => (
              <span key={role} className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                <I18N id={`adminUsers.role.${role}`} />
              </span>
            ))}
          </div>
        ) : (
          "-"
        )}
      </Row>
      {showItems ? (
        <div className="mt-4">
          <h4 className="font-bold mb-1">
            <I18N id="adminUserModal.items.title" />
          </h4>
          <AdminUserItems userId={user.user_id} />
        </div>
      ) : null}
    </div>
  );
};

/* Admin-only: GET mathtrades/<active edition>/admin-users/<user_id>/.
 * A 404 means the user has no membership in this edition. */
const AdminUserModal = ({
  userId = 0,
  initialSection,
  onClose = () => {},
}: {
  userId?: number;
  // "items": open with the Ejemplares section expanded.
  initialSection?: "items";
  onClose?: () => void;
}) => {
  const urlParams = useMemo(() => [userId], [userId]);
  const [, data, loading, error] = useFetch({
    endpoint: "ADMIN_GET_USER",
    urlParams,
    autoLoad: true,
  });

  const notMember = (error as { status?: number } | null)?.status === 404;
  const user = data as AdminUserRow | null;

  return (
    <Modal isOpen size="md" onClose={onClose}>
      <div className="relative min-h-[160px]">
        <LoadingBox loading={loading} min transparent />
        {notMember ? (
          <p className="text-center py-10 font-semibold">
            <I18N id="adminUserModal.notMember" />
          </p>
        ) : error ? (
          <ErrorAlert error={error} />
        ) : user && !loading ? (
          <Detail user={user} initialSection={initialSection} />
        ) : null}
      </div>
    </Modal>
  );
};

export default AdminUserModal;
