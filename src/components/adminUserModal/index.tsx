"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { FloatingPortal } from "@floating-ui/react";
import { useStore } from "@/store";
import useFetch from "@/hooks/useFetch";
import AdminUserModal from "./modal";
import NewUserBadge from "./newUserBadge";

export { NewUserBadge };

// section "items": open with the user's copies (Ejemplares) expanded.
export type OpenAdminUserOptions = { section?: "items" };

type AdminUserContextValue = {
  // false outside the provider (e.g. public pages): nothing is clickable.
  available: boolean;
  openAdminUser: (userId: number, opts?: OpenAdminUserOptions) => void;
  // Members of the edition with no items in any other one (admins only).
  isNewUser: (userId?: number | string | null) => boolean;
};

const AdminUserContext = createContext<AdminUserContextValue>({
  available: false,
  openAdminUser: () => {},
  isNewUser: () => false,
});

/* Admins can open any user shown in the app (cards, comments, tables, admin
 * pages) in a modal with their data for the active edition. One modal for the
 * whole private area, portaled to <body> so it stacks above the item preview
 * and want modals it can be opened from. */
export const AdminUserModalProvider = ({ children = null }: { children?: ReactNode }) => {
  // n: bumped on every open, to key the portal.
  const [open, setOpen] = useState<{ userId: number; section?: "items"; n: number } | null>(
    null
  );

  const openAdminUser = useCallback((id: number, opts?: OpenAdminUserOptions) => {
    setOpen((prev) => ({ userId: id, section: opts?.section, n: (prev?.n || 0) + 1 }));
  }, []);

  // New members' ids, once per session and edition. useFetch's autoLoad
  // effect returns early when false, so non-admins never call the endpoint.
  const mathAdmin = useStore((state) => state.data?.user?.math_admin);
  const mathtradeId = useStore((state) => state.data?.mathtrade?.id);
  const [, newIdsData] = useFetch({
    endpoint: "ADMIN_GET_NEW_USER_IDS",
    autoLoad: !!mathAdmin && !!mathtradeId,
  });
  const newIds = useMemo(
    () => new Set<number>(Array.isArray(newIdsData) ? newIdsData : []),
    [newIdsData]
  );
  const isNewUser = useCallback(
    (id?: number | string | null) => !!mathAdmin && !!id && newIds.has(Number(id)),
    [mathAdmin, newIds]
  );

  const value = useMemo(
    () => ({ available: true, openAdminUser, isNewUser }),
    [openAdminUser, isNewUser]
  );

  return (
    <AdminUserContext.Provider value={value}>
      {children}
      {open ? (
        // Keyed portal: every open re-appends it to <body>, so it lands above
        // an item previewer opened from it (the previewer portals too).
        <FloatingPortal key={open.n}>
          <AdminUserModal
            userId={open.userId}
            initialSection={open.section}
            onClose={() => setOpen(null)}
          />
        </FloatingPortal>
      ) : null}
    </AdminUserContext.Provider>
  );
};

/** `isAdmin`: the session user is a math_admin (inside the private area).
 *  `openAdminUser`: a no-op for everybody else.
 *  `isNewUser(id)`: a member with no items in other editions; always false
 *  for non-admins. */
export const useAdminUser = () => {
  const { available, openAdminUser, isNewUser: isNew } = useContext(AdminUserContext);
  const mathAdmin = useStore((state) => state.data?.user?.math_admin);
  const isAdmin = available && !!mathAdmin;

  const open = useCallback(
    (userId: number, opts?: OpenAdminUserOptions) => {
      if (isAdmin && userId) openAdminUser(userId, opts);
    },
    [isAdmin, openAdminUser]
  );

  const isNewUser = useCallback(
    (userId?: number | string | null) => isAdmin && isNew(userId),
    [isAdmin, isNew]
  );

  return { isAdmin, openAdminUser: open, isNewUser };
};

/** A user's name (or any content) that opens the admin user modal. For
 *  non-admins, or without an id, it renders the content unchanged. Usable
 *  inside table column renderers, which can't call hooks themselves. */
export const AdminUserName = ({
  userId = null,
  children = null,
  className = "",
}: {
  userId?: number | null;
  children?: ReactNode;
  className?: string;
}) => {
  const { isAdmin, openAdminUser, isNewUser } = useAdminUser();

  if (!isAdmin || !userId) {
    return <>{children}</>;
  }
  const isNew = isNewUser(userId);

  return (
    <button
      type="button"
      className={clsx(
        "text-left hover:underline cursor-pointer max-w-full",
        // New member: violet, with the badge beside block children too.
        { "text-violet-700 inline-flex items-center": isNew },
        className
      )}
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        openAdminUser(userId);
      }}
    >
      {children}
      <NewUserBadge userId={userId} />
    </button>
  );
};
