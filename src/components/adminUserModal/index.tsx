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
import AdminUserModal from "./modal";

type AdminUserContextValue = {
  // false outside the provider (e.g. public pages): nothing is clickable.
  available: boolean;
  openAdminUser: (userId: number) => void;
};

const AdminUserContext = createContext<AdminUserContextValue>({
  available: false,
  openAdminUser: () => {},
});

/* Admins can open any user shown in the app (cards, comments, tables, admin
 * pages) in a modal with their data for the active edition. One modal for the
 * whole private area, portaled to <body> so it stacks above the item preview
 * and want modals it can be opened from. */
export const AdminUserModalProvider = ({ children = null }: { children?: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  const openAdminUser = useCallback((id: number) => {
    setUserId(id);
  }, []);

  const value = useMemo(() => ({ available: true, openAdminUser }), [openAdminUser]);

  return (
    <AdminUserContext.Provider value={value}>
      {children}
      {userId ? (
        <FloatingPortal>
          <AdminUserModal key={userId} userId={userId} onClose={() => setUserId(null)} />
        </FloatingPortal>
      ) : null}
    </AdminUserContext.Provider>
  );
};

/** `isAdmin`: the session user is a math_admin (inside the private area).
 *  `openAdminUser`: a no-op for everybody else. */
export const useAdminUser = () => {
  const { available, openAdminUser } = useContext(AdminUserContext);
  const mathAdmin = useStore((state) => state.data?.user?.math_admin);
  const isAdmin = available && !!mathAdmin;

  const open = useCallback(
    (userId: number) => {
      if (isAdmin && userId) openAdminUser(userId);
    },
    [isAdmin, openAdminUser]
  );

  return { isAdmin, openAdminUser: open };
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
  const { isAdmin, openAdminUser } = useAdminUser();

  if (!isAdmin || !userId) {
    return <>{children}</>;
  }

  return (
    <button
      type="button"
      className={clsx(
        "text-left hover:underline cursor-pointer max-w-full",
        className
      )}
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        openAdminUser(userId);
      }}
    >
      {children}
    </button>
  );
};
