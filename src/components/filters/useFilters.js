import { useCallback, useContext, useEffect, useState } from "react";
import { useStore, useOptions } from "@/store";
import { SidebarContext } from "@/context/sidebar";
import { GotoTopContext } from "@/context/goto-top";
import { banOptionsValues } from "@/config/banOptions";

const useFilters = ({ type }) => {
  const { hideSidebar } = useContext(SidebarContext);
  const { gotoTop } = useContext(GotoTopContext);

  /* FILTERS */
  const filters_item = useOptions((state) => state.filters_item);
  const filters_game = useOptions((state) => state.filters_game);
  const updateFilters = useOptions((state) => state.updateFilters);

  const clearFilters = useCallback(
    (e) => {
      e.preventDefault();

      hideSidebar();

      const newFilters = {};
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

  const [enabledRender, setEnabledRender] = useState(true);

  /*************************/
  const [tabOpSelected, setTabOpSelected] = useState(0);
  useEffect(() => {
    if (type !== "item") {
      setTabOpSelected(0);
    }
  }, [type]);
  /*************************/

  return {
    enabledRender,
    onSubmit: (dataFromForm) => {
      hideSidebar();

      const newFilters = {};

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
            newFilters[key] = value?.length > 0 ? value : undefined;
        }
      });

      if (hide_my_user && typeof newFilters.user === "undefined") {
        newFilters.user = -1 * parseInt(user?.id || 999, 10);
      }

      switch (newFilters.ignored) {
        case banOptionsValues.true_value:
          newFilters.ignored = true;
          break;
        case banOptionsValues.false_value:
          newFilters.ignored = false;
          break;
        default:
          newFilters.ignored = undefined;
      }

      newFilters.wanted = hide_wanted === "true" ? false : undefined;

      newFilters.wantable = wantable === "true" ? "true" : undefined;

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
      tag: "multiple",
      status: "multiple",
      location: "multiple",
      language: "multiple",
      dependency: "multiple",
      user: "number",
      hide_my_user: "boolean",
    },
    clearFilters,
    tabOpSelected,
    setTabOpSelected,
  };
};

export default useFilters;
