"use client";
import { useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";

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
  contribution_status: "missing" | "pending" | "approved" | "rejected";
  self_excluded: boolean;
  commitment: boolean;
  roles: ("admin" | "volunteer" | "referrer")[];
};

export type ContactFilter = "" | "missing" | "partial";

type LocationRef = { id: number; name: string };

const SEARCH_DEBOUNCE_MS = 350;

/* Admin users list (BE admin-users/, IsAdminAuthenticated). The filters are
 * server-side; the search is debounced so typing doesn't fire a request per
 * key. */
const useAdminUsers = () => {
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [contact, setContact] = useState<ContactFilter>("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

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
  const list: AdminUserRow[] = Array.isArray(rows) ? rows : [];

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
    search,
    setSearch,
    contact,
    setContact,
    status,
    setStatus,
    location,
    setLocation,
    locations,
  };
};

export default useAdminUsers;
