"use client";
import { useCallback, useContext } from "react";
import { useOptions, useStore } from "@/store";
import { GotoTopContext } from "@/context/goto-top";

/**
 * Applies a filter-panel Switch immediately (same semantics as useFilters.onSubmit
 * for favorite / hide_favorite / wantable / hide_wanted / hide_my_user), without waiting for Filtrar.
 */
const useApplyToggleFilter = (type: "item" | "game") => {
  const updateFilters = useOptions((state) => state.updateFilters);
  const filters = useOptions((state) => state[`filters_${type}`]);
  const { gotoTop } = useContext(GotoTopContext);
  const { user } = useStore((state) => state.data);

  return useCallback(
    (name: string, checked: boolean) => {
      const patch: Record<string, any> = { page: 1 };

      switch (name) {
        // "Solo favoritos" and "Ocultar favoritos" share one param, so
        // turning one on turns the other off.
        case "favorite":
          patch.favorite = checked ? "true" : undefined;
          break;
        case "hide_favorite":
          patch.favorite = checked ? "false" : undefined;
          break;
        case "wantable":
          patch.wantable = checked ? "true" : undefined;
          break;
        case "hide_wanted":
          patch.wanted = checked ? false : undefined;
          break;
        case "hide_my_user": {
          const currentUser = filters?.user;
          if (checked) {
            // Same as onSubmit: only invent -userId when no positive user filter.
            if (
              currentUser === undefined ||
              currentUser === null ||
              currentUser < 0
            ) {
              patch.user = -1 * parseInt(user?.id || "999", 10);
            }
          } else if (typeof currentUser === "number" && currentUser < 0) {
            patch.user = undefined;
          }
          break;
        }
        default:
          patch[name] = checked || undefined;
          break;
      }

      gotoTop();
      updateFilters(patch, type);
    },
    [filters?.user, gotoTop, type, updateFilters, user?.id]
  );
};

export default useApplyToggleFilter;
