import { useCallback, useState } from "react";
import useFetch from "@/hooks/useFetch";

export type DuplicateWantGroup = {
  id: number;
  name: string;
  type: "game" | "item" | "tag";
};
export type DuplicateWant = {
  kind: "game" | "combo";
  bgg_id: number | null;
  item_id: number | null;
  name: string;
  owner: string | null;
  groups: DuplicateWantGroup[];
};
export type DuplicatesResponse = { count: number; duplicates: DuplicateWant[] };

/**
 * My wants that could bring the same game twice
 * (BE `GET user-want-groups/duplicates/`).
 */
const useDuplicateWants = () => {
  const [getDuplicates, , loading] = useFetch({
    endpoint: "GET_MYWANTS_DUPLICATES",
  });
  const [data, setData] = useState<DuplicatesResponse | null>(null);

  // Resolves null on any error (404 before the BE deploy, network, 5xx):
  // the check only warns, so callers fail open.
  const load = useCallback(async (): Promise<DuplicatesResponse | null> => {
    const res: any = await getDuplicates();
    const ok =
      res && Array.isArray(res.duplicates) ? (res as DuplicatesResponse) : null;
    setData(ok);
    return ok;
  }, [getDuplicates]);

  return { load, data, loading };
};

export default useDuplicateWants;
