"use client";
import { useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import useSortedRows from "./useSortedRows";

export type AdminUserRow = {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  telegram: string | null;
  bgg_user: string | null;
  avatar: string | null;
  referring: string | null;
  location_id: number | null;
  location: string | null;
  copies: number;
  // Optional: tolerate a backend that doesn't send it yet (falls back to copies).
  ready_copies?: number;
  contribution_status: "missing" | "pending" | "approved" | "rejected";
  self_excluded: boolean;
  commitment: boolean;
  // No items in any other edition. Optional like ready_copies.
  is_new?: boolean;
  roles: ("admin" | "volunteer" | "referrer")[];
};

export type SortKey = "name" | "city" | "contact" | "referring" | "copies" | "status" | "flags";
export type SortDir = "asc" | "desc";
export type SortState = { key: SortKey; dir: SortDir } | null;

export type ContactFilter = "" | "missing" | "partial";

type LocationRef = { id: number; name: string };

const SEARCH_DEBOUNCE_MS = 350;
const EMPTY: AdminUserRow[] = [];

/* Admin users list (BE admin-users/, IsAdminAuthenticated). The filters are
 * server-side; the search is debounced so typing doesn't fire a request per
 * key. */
const useAdminUsers = () => {
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [contact, setContact] = useState<ContactFilter>("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  // "Nuevos": client-side, on top of the server filters.
  const [onlyNew, setOnlyNew] = useState(false);
  // Client-side, independent of the filters, so it survives filter changes.
  const [sort, setSort] = useState<SortState>(null);

  useEffect(() => {
    const timer = setTimeout(() => setQ(search.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  // Stable identity: useFetch refetches when the params key changes.
  const params = useMemo(() => {
    const p: Record<string, string> = {};
    if (q) p.q = q;
    if (contact) p.contact = contact;
    if (status) p.status = status;
    if (location) p.location = location;
    return p;
  }, [q, contact, status, location]);

  const [, rows, loading, error] = useFetch({
    endpoint: "ADMIN_GET_USERS",
    params,
    initialState: [],
    autoLoad: true,
  });
  const all = Array.isArray(rows) ? (rows as AdminUserRow[]) : EMPTY;
  const newCount = useMemo(() => all.filter((row) => row.is_new).length, [all]);
  const filtered = useMemo(
    () => (onlyNew ? all.filter((row) => row.is_new) : all),
    [all, onlyNew]
  );
  const list = useSortedRows(filtered, sort);

  // asc → desc → none (back to the backend order: name).
  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s?.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null
    );

  const storeLocations = useStore((state) => state.locations);
  const locations: LocationRef[] = useMemo(
    () =>
      (Array.isArray(storeLocations) ? [...storeLocations] : [])
        .map(({ id, name }: LocationRef) => ({ id, name }))
        .sort((a: LocationRef, b: LocationRef) => a.name.localeCompare(b.name, "es")),
    [storeLocations]
  );

  return {
    list,
    loading,
    error,
    sort,
    toggleSort,
    search,
    setSearch,
    contact,
    setContact,
    status,
    setStatus,
    location,
    setLocation,
    locations,
    onlyNew,
    setOnlyNew,
    newCount,
  };
};

export default useAdminUsers;
