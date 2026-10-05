"use client";
import { useCallback, useContext, useMemo } from "react";
import { useOptions, useStore } from "@/store";
import { PageContext } from "@/context/page";
import { GotoTopContext } from "@/context/goto-top";
import { getI18Ntext } from "@/i18n";
import { getBggTaxonomyLabel } from "@/i18n/getBggTaxonomyLabel";
import languagesOptions from "@/config/languagesOptions";
import { boxStatusList, componentsStatusList } from "@/config/statusTypes";
import {
  dependencyLabel,
  normalizeDependencyValue,
} from "@/config/dependencyTypes";
import FilterChip from "./chip";

const EXCLUDE = ["page", "order", "page_size", "keyword"];

type ChipItem = {
  key: string;
  label: string;
  clear: Record<string, any>;
  color?: string;
};

const labelFor = (list: { value: any; text: string }[], value: any) =>
  list.find((item) => `${item.value}` === `${value}`)?.text || `${value}`;

const ActiveFilterChips = ({ type = "item" }: { type?: "item" | "game" }) => {
  const storedFilters = useOptions((state) => state[`filters_${type}`]);
  const filters = useMemo(() => storedFilters || {}, [storedFilters]);
  const updateFilters = useOptions((state) => state.updateFilters);
  const { gotoTop } = useContext(GotoTopContext);
  const { itemTags, users, filterData } = useContext(PageContext);
  const locations = useStore((state) => state.locations);
  const locationList = useMemo(
    () => (Array.isArray(locations) ? locations : []),
    [locations]
  );

  const chips = useMemo(() => {
    const next: ChipItem[] = [];
    const keys = Object.keys(filters).filter((key) => !EXCLUDE.includes(key));

    const rangeBases = new Set(
      keys
        .filter((key) => key.endsWith("-from") || key.endsWith("-to"))
        .map((key) => key.replace(/-from$|-to$/, ""))
    );

    const used = new Set<string>();

    if (filters.tag?.[0] && itemTags?.length) {
      const tag = itemTags.find((item) => `${item.id}` === `${filters.tag[0]}`);
      if (tag) {
        next.push({
          key: "tag",
          label: tag.name,
          color: tag.color,
          clear: { tag: undefined },
        });
        used.add("tag");
      }
    }

    rangeBases.forEach((base) => {
      const from = filters[`${base}-from`];
      const to = filters[`${base}-to`];
      if (from === undefined && to === undefined) return;
      const titleId =
        base === "value"
          ? "filter.Value"
          : base === "rate"
            ? "filter.Rating.geek"
            : base === "average_rate"
              ? "filter.Rating.avg"
              : base === "weight"
                ? "filter.Weight"
                : base;
      next.push({
        key: base,
        label: `${getI18Ntext(titleId)} ${from ?? ""}–${to ?? ""}`,
        clear: { [`${base}-from`]: undefined, [`${base}-to`]: undefined },
      });
      used.add(`${base}-from`);
      used.add(`${base}-to`);
    });

    keys.forEach((key) => {
      if (used.has(key)) return;
      const value = filters[key];
      if (value === undefined || value === null || value === "") return;

      if (key === "type") {
        const typeLabel =
          `${value}` === "1"
            ? getI18Ntext("filter.Type.Game")
            : `${value}` === "2"
              ? getI18Ntext("filter.Type.Expansion")
              : getI18Ntext("filter.Type.Other.short");
        next.push({ key, label: typeLabel, clear: { type: undefined } });
        return;
      }

      if (key === "language") {
        const values = Array.isArray(value) ? value : [value];
        values.forEach((item) => {
          next.push({
            key: `language-${item}`,
            label: labelFor(languagesOptions, item),
            clear: {
              language:
                values.length > 1
                  ? values.filter((entry) => entry !== item)
                  : undefined,
            },
          });
        });
        return;
      }

      if (key === "location") {
        const values = Array.isArray(value) ? value : [value];
        values.forEach((item) => {
          const loc = locationList.find((entry) => `${entry.id}` === `${item}`);
          next.push({
            key: `location-${item}`,
            label: loc?.name || `${item}`,
            clear: {
              location:
                values.length > 1
                  ? values.filter((entry) => `${entry}` !== `${item}`)
                  : undefined,
            },
          });
        });
        return;
      }

      if (key === "dependency") {
        const values = Array.isArray(value) ? value : [value];
        values.forEach((item) => {
          next.push({
            key: `dependency-${item}`,
            label: dependencyLabel(normalizeDependencyValue(item)),
            clear: {
              dependency:
                values.length > 1
                  ? values.filter((entry) => `${entry}` !== `${item}`)
                  : undefined,
            },
          });
        });
        return;
      }

      if (key === "best_players" || key === "players") {
        const values = Array.isArray(value) ? value : `${value}`.split(",");
        const title =
          key === "best_players"
            ? getI18Ntext("filter.BestPlayers")
            : getI18Ntext("filter.Players");
        values.filter(Boolean).forEach((item) => {
          next.push({
            key: `${key}-${item}`,
            label: `${title}: ${item}`,
            clear: {
              [key]:
                values.length > 1
                  ? values.filter((entry) => `${entry}` !== `${item}`)
                  : undefined,
            },
          });
        });
        return;
      }

      if (key === "category" || key === "mechanic") {
        const values = Array.isArray(value) ? value : `${value}`.split(",");
        const catalog =
          key === "category"
            ? filterData?.categories || []
            : filterData?.mechanisms || [];
        const title =
          key === "category"
            ? getI18Ntext("filter.Categories")
            : getI18Ntext("filter.Mechanisms");
        values.filter(Boolean).forEach((item) => {
          const row = catalog.find(
            (entry: { bgg_id: number; name?: string }) =>
              `${entry.bgg_id}` === `${item}`
          );
          const labelName = getBggTaxonomyLabel(
            key === "category" ? "category" : "mechanic",
            row || { bgg_id: Number(item) }
          );
          next.push({
            key: `${key}-${item}`,
            label: `${title}: ${labelName || item}`,
            clear: {
              [key]:
                values.length > 1
                  ? values.filter((entry) => `${entry}` !== `${item}`)
                  : undefined,
            },
          });
        });
        return;
      }

      if (key === "box_status") {
        next.push({
          key,
          label: labelFor(boxStatusList, value),
          clear: { box_status: undefined },
        });
        return;
      }

      if (key === "component_status") {
        next.push({
          key,
          label: labelFor(componentsStatusList, value),
          clear: { component_status: undefined },
        });
        return;
      }

      if (key === "user") {
        const userId = parseInt(value, 10);
        if (userId < 0) {
          next.push({
            key,
            label: getI18Ntext(
              type === "game" ? "hideOwnGames.label" : "hideOwnItems.label"
            ),
            clear: { user: undefined },
          });
        } else {
          const user = users?.find((entry) => `${entry.id}` === `${userId}`);
          next.push({
            key,
            label: user
              ? `${user.first_name} ${user.last_name}`
              : getI18Ntext("filter.User"),
            clear: { user: undefined },
          });
        }
        return;
      }

      if (key === "ignored") {
        if (value !== true && value !== false) return;
        const suffix = type === "game" ? "game" : "item";
        const id =
          value === true
            ? `ban.btn-filter.show.${suffix}`
            : `ban.btn-filter.all.${suffix}`;
        next.push({ key, label: getI18Ntext(id), clear: { ignored: undefined } });
        return;
      }

      if (key === "wanted") {
        next.push({
          key,
          label: getI18Ntext(
            type === "game" ? "hideWanted.games.label" : "hideWanted.items.label"
          ),
          clear: { wanted: undefined },
        });
        return;
      }

      if (key === "favorite") {
        if (`${value}` !== "true") return;
        next.push({
          key,
          label: getI18Ntext(
            type === "game" ? "favorite.filter.games" : "favorite.filter.items"
          ),
          clear: { favorite: undefined },
        });
        return;
      }

      if (key === "wantable") {
        next.push({
          key,
          label: getI18Ntext(
            type === "game" ? "wantAble.games.label" : "wantAble.items.label"
          ).replace(/<[^>]+>/g, ""),
          clear: { wantable: undefined },
        });
        return;
      }

      next.push({
        key,
        label: String(value),
        clear: { [key]: undefined },
      });
    });

    return next;
  }, [filters, filterData, itemTags, locationList, users, type]);

  const remove = useCallback(
    (clear: Record<string, any>) => {
      gotoTop();
      updateFilters({ ...clear, page: 1 }, type);
    },
    [gotoTop, updateFilters, type]
  );

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-label={getI18Ntext("filter.Title")}>
      {chips.map((chip) => (
        <FilterChip
          key={chip.key}
          selected={Boolean(chip.color)}
          color={chip.color}
          className={chip.color ? "" : "bg-white border border-gray-200 text-gray-700"}
          onClick={() => remove(chip.clear)}
          onRemove={() => remove(chip.clear)}
        >
          {chip.label}
        </FilterChip>
      ))}
    </div>
  );
};

export default ActiveFilterChips;
