"use client";
import { useCallback, useContext, useState } from "react";
import { useStore, useOptions } from "@/store";
import { SidebarContext } from "@/context/sidebar";
import { GotoTopContext } from "@/context/goto-top";

const useFilters = ({ type = "item" }: { type?: "item" | "game" }) => {
  const { hideSidebar } = useContext(SidebarContext);
  const { gotoTop } = useContext(GotoTopContext);

  const filters_item = useOptions((state) => state.filters_item);
  const filters_game = useOptions((state) => state.filters_game);
  const updateFilters = useOptions((state) => state.updateFilters);

  const [enabledRender, setEnabledRender] = useState(true);

  const clearFilters = useCallback(
    (e) => {
      e.preventDefault();
      hideSidebar();
      const newFilters: Record<string, any> = {};
      Object.keys(type === "item" ? filters_item : filters_game).forEach(
        (key) => {
          newFilters[key] = undefined;
        }
      );
      gotoTop();
      updateFilters(newFilters, type);
      setEnabledRender(false);
      setTimeout(() => {
        setEnabledRender(true);
      }, 150);
    },
    [filters_item, filters_game, type, updateFilters, hideSidebar, gotoTop]
  );

  const { user } = useStore((state) => state.data);

  return {
    enabledRender,
    onSubmit: (dataFromForm) => {
      hideSidebar();
      const newFilters: Record<string, any> = {};
      const { hide_my_user, hide_wanted, wantable } = dataFromForm;
      delete dataFromForm.hide_my_user;
      delete dataFromForm.hide_wanted;

      Object.entries(dataFromForm).forEach(([key, value]) => {
        switch (typeof value) {
          case "number":
            newFilters[key] = isNaN(value) ? undefined : value;
            break;
          case "boolean":
            newFilters[key] = value || undefined;
            break;
          case "undefined":
            newFilters[key] = undefined;
            break;
          default:
            newFilters[key] =
              value &&
              typeof value === "object" &&
              "length" in (value as any) &&
              (value as any).length > 0
                ? value
                : typeof value === "string" && value.length > 0
                  ? value
                  : undefined;
        }
      });

      if (hide_my_user && typeof newFilters.user === "undefined") {
        newFilters.user = -1 * parseInt(user?.id || 999, 10);
      }

      newFilters.wanted = hide_wanted === "true" ? false : undefined;
      newFilters.wantable = wantable === "true" ? "true" : undefined;
      newFilters.favorite = dataFromForm.favorite === "true" ? "true" : undefined;

      gotoTop();
      updateFilters(
        {
          ...newFilters,
          page: 1,
        },
        type
      );
    },
    formatTypes: {
      location: "multiple",
      language: "multiple",
      tag: "multiple",
      user: "number",
      hide_my_user: "boolean",
    },
    clearFilters,
  };
};

export default useFilters;
