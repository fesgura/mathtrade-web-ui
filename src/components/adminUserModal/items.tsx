"use client";
import { useContext, useMemo } from "react";
import clsx from "clsx";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import I18N from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";

export type AdminUserItem = {
  id: number;
  title: string;
  ready: boolean;
  traded: boolean;
  added_mt: string;
  cloned_from_mathtrade: string | null;
  elements_count: number;
  // Elements still 'Copiado' (a clone not edited yet): what keeps it from being ready.
  pending_elements: { name: string; box: boolean; components: boolean }[];
};

const badgeClass = "inline-block rounded-full text-xs font-semibold px-2 py-0.5 whitespace-nowrap";

const Badge = ({ item }: { item: AdminUserItem }) =>
  item.traded ? (
    <span className={clsx(badgeClass, "bg-gray-100 text-gray-700")}>
      <I18N id="adminUserModal.items.traded" />
    </span>
  ) : !item.ready ? (
    <span className={clsx(badgeClass, "bg-amber-100 text-amber-800")}>
      <I18N id="adminUserModal.items.notReady" />
    </span>
  ) : (
    <span className={clsx(badgeClass, "bg-green-100 text-green-800")}>
      <I18N id="adminUserModal.items.ready" />
    </span>
  );

const Missing = ({ element }: { element: AdminUserItem["pending_elements"][number] }) => {
  const parts = [
    element.box ? "adminUserModal.items.box" : null,
    element.components ? "adminUserModal.items.components" : null,
  ].filter(Boolean) as string[];

  return (
    <div className="text-xs text-amber-800">
      <I18N id="adminUserModal.items.missing" />: {element.name} (
      {parts.map((id, i) => (
        <span key={id}>
          {i ? ", " : ""}
          <I18N id={id} />
        </span>
      ))}
      )
    </div>
  );
};

/* Admin-only: GET mathtrades/<active edition>/admin-users/<user_id>/items/.
 * The backend orders them: not ready, ready, traded. */
const AdminUserItems = ({ userId = 0 }: { userId?: number }) => {
  const { setItemPreviewId, setShowModalPreview } = useContext(PageContext);
  const urlParams = useMemo(() => [userId], [userId]);
  const [, data, loading, error] = useFetch({
    endpoint: "ADMIN_GET_USER_ITEMS",
    urlParams,
    autoLoad: true,
  });

  const items = (data as AdminUserItem[] | null) || [];

  return (
    <div className="relative min-h-[60px]">
      <LoadingBox loading={loading} min transparent />
      {error ? (
        <ErrorAlert error={error} />
      ) : loading ? null : !items.length ? (
        <p className="text-sm text-gray-500 py-2">
          <I18N id="adminUserModal.items.none" />
        </p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="py-2 border-b border-gray-100 text-sm">
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1 font-semibold break-words">{item.title}</div>
                <Badge item={item} />
                {item.ready && !item.traded ? (
                  <button
                    type="button"
                    className="text-primary underline text-xs whitespace-nowrap"
                    onClick={() => {
                      // The previewer portals on open, so it stacks above this modal.
                      setItemPreviewId(item.id);
                      setShowModalPreview(true);
                    }}
                  >
                    <I18N id="adminUserModal.items.view" />
                  </button>
                ) : null}
              </div>
              {!item.ready
                ? item.pending_elements.map((element, i) => <Missing key={i} element={element} />)
                : null}
              <div className="text-xs text-gray-500">
                {item.cloned_from_mathtrade ? (
                  <>
                    <I18N id="adminUserModal.items.clonedFrom" /> {item.cloned_from_mathtrade} ·{" "}
                  </>
                ) : null}
                <I18N id="adminUserModal.items.added" />{" "}
                {new Date(item.added_mt).toLocaleDateString("es-AR")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUserItems;
