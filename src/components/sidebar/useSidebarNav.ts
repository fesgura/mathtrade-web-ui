import { useContext, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PageContext } from "@/context/page";
import { useStore, useOptions } from "@/store";
import { HOME_ENTRY, PRIMARY_NAV, type NavEntry } from "@/config/nav";
import { PRIVATE_ROUTES } from "@/config/routes";
import { formatDateString } from "@/utils/dateUtils";

export const COLLAPSE_KEY = "sidebar_mainNav_collapsed";
const DEFAULT_KEYS = ["MY_COLLECTION", "STATS"];

// These require an accepted Membership in the active mathtrade to be usable at all.
const MEMBERSHIP_GATED_KEYS = [
  "OFFER",
  "MY_OFFER",
  "WANTS",
  "PROVISIONAL_RESULTS",
  "RESULTS",
];

export type LockedInfo = {
  daysLeft: number;
  captionId: string;
  displayValue?: string | number;
};

export type NavGroup = {
  id: string;
  labelI18nKey: string;
  items: NavEntry[];
};

const EVENT_ORDER = [
  "OFFER",
  "MY_OFFER",
  "WANTS",
  "PROVISIONAL_RESULTS",
  "RESULTS",
  "SIGN_TO_MATHTRADE",
];
const SPACE_ORDER = ["MY_COLLECTION", "STATS", "RESULTS_HISTORIAL", "MY_DATA"];

const sortBy = (order: string[]) => (a: NavEntry, b: NavEntry) =>
  order.indexOf(a.key) - order.indexOf(b.key);

const daysLeftUntil = (isoDate) =>
  Math.max(
    0,
    Math.ceil((new Date(isoDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

const captionIdFor = (
  stage: "wants" | "results" | "provisional",
  daysLeft: number
) => {
  const base = `menu.locked.${stage}`;
  if (daysLeft <= 0) return `${base}.today`;
  if (daysLeft === 1) return `${base}.1day`;
  return `${base}.days`;
};

const useSidebarNav = () => {
  const { canI } = useContext(PageContext);
  const { membership, mathtrade, mathtrade_history, user } = useStore(
    (state) => state.data
  );
  const isAdmin = Boolean(user?.math_admin);
  const pathname = usePathname();

  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const collapsed = Boolean(options[COLLAPSE_KEY]);
  const toggleCollapsed = () => updateOptions({ [COLLAPSE_KEY]: !collapsed });

  const items: NavEntry[] = useMemo(() => {
    const withHome = (list: NavEntry[]) => [HOME_ENTRY, ...list];
    if (mathtrade) {
      // Full nav is shown even without a membership yet — gated items render
      // locked (see lockedInfo) instead of being hidden outright, so people
      // can see what's coming and when it opens.
      const nav = PRIMARY_NAV
        // An edition without provisional results has no page for them.
        .filter(
          (entry) =>
            entry.key !== "PROVISIONAL_RESULTS" || mathtrade.provisional_results_date
        )
        .map((entry) => {
          if (entry.key === "MY_DATA" && !membership) {
            return { ...entry, titleI18nKey: "menu.myData.signup" };
          }
          return entry;
        });
      return withHome(nav);
    }
    const visibleKeys =
      mathtrade_history?.length > 0
        ? [...DEFAULT_KEYS, "RESULTS_HISTORIAL"]
        : DEFAULT_KEYS;
    const base = PRIMARY_NAV.filter((entry) => visibleKeys.includes(entry.key));
    return withHome(base);
  }, [mathtrade, membership, mathtrade_history]);

  const lockedInfo: Record<string, LockedInfo> = useMemo(() => {
    const locked: Record<string, LockedInfo> = {};

    if (mathtrade && !membership) {
      MEMBERSHIP_GATED_KEYS.forEach((key) => {
        if (canI.sign) {
          // Signup window is open — just haven't accepted membership yet.
          locked[key] = { daysLeft: 0, captionId: "menu.locked.needMembership" };
        } else if (
          mathtrade.start_date &&
          new Date(mathtrade.start_date).getTime() > Date.now()
        ) {
          const { day, month } = formatDateString(mathtrade.start_date).dateObj;
          locked[key] = {
            daysLeft: daysLeftUntil(mathtrade.start_date),
            captionId: "menu.locked.signupOpensOn",
            displayValue: `${day}/${month}`,
          };
        } else if (mathtrade.start_date) {
          // Started, but sign-up already closed.
          const close = mathtrade.signup_close_date || mathtrade.freeze_geek_date;
          const { day, month } = formatDateString(close).dateObj;
          locked[key] = {
            daysLeft: 0,
            captionId: "menu.locked.signupClosedOn",
            displayValue: `${day}/${month}`,
          };
        }
      });
      return locked;
    }

    // Signed up, but the edition hasn't started yet (e.g. sign-up before
    // the opening, or an admin moving the start): nothing opens until then.
    if (
      mathtrade?.start_date &&
      new Date(mathtrade.start_date).getTime() > Date.now()
    ) {
      const { day, month } = formatDateString(mathtrade.start_date).dateObj;
      MEMBERSHIP_GATED_KEYS.forEach((key) => {
        locked[key] = {
          daysLeft: daysLeftUntil(mathtrade.start_date),
          captionId: "menu.locked.opensOn",
          displayValue: `${day}/${month}`,
        };
      });
      return locked;
    }

    if (canI.offer && mathtrade?.freeze_geek_date) {
      const daysLeft = daysLeftUntil(mathtrade.freeze_geek_date);
      locked.WANTS = {
        daysLeft,
        captionId: captionIdFor("wants", daysLeft),
      };
    }
    if (
      !canI.provisionalResults &&
      mathtrade?.provisional_results_date
    ) {
      const daysLeft = daysLeftUntil(mathtrade.provisional_results_date);
      locked.PROVISIONAL_RESULTS = {
        daysLeft,
        captionId: captionIdFor("provisional", daysLeft),
      };
    }
    if (!canI.results) {
      const unlockDate = [mathtrade?.show_results_date, mathtrade?.freeze_wants_date]
        .filter(Boolean)
        .sort(
          (a, b) => new Date(b as string).getTime() - new Date(a as string).getTime()
        )[0];
      if (unlockDate) {
        const daysLeft = daysLeftUntil(unlockDate);
        locked.RESULTS = {
          daysLeft,
          captionId: captionIdFor("results", daysLeft),
        };
      }
    }
    return locked;
  }, [
    mathtrade,
    membership,
    canI.sign,
    canI.offer,
    canI.provisionalResults,
    canI.results,
  ]);

  const groups: NavGroup[] = useMemo(() => {
    const eventItems = items
      .filter((entry) => EVENT_ORDER.includes(entry.key))
      .sort(sortBy(EVENT_ORDER));
    const spaceItems = items
      .filter((entry) => SPACE_ORDER.includes(entry.key))
      .sort(sortBy(SPACE_ORDER));
    const next: NavGroup[] = [];
    if (eventItems.length) {
      next.push({
        id: "event",
        labelI18nKey: "menu.group.event",
        items: eventItems,
      });
    }
    if (spaceItems.length) {
      next.push({
        id: "space",
        labelI18nKey: "menu.group.space",
        items: spaceItems,
      });
    }
    return next;
  }, [items]);

  const isActive = (path: string) => {
    if (path === PRIVATE_ROUTES.HOME.path) {
      return pathname === path;
    }
    return pathname === path || Boolean(pathname && pathname.startsWith(path + "/"));
  };

  const provisionalWindowActive = Boolean(
    canI.provisionalResults && !canI.results
  );

  return {
    items,
    groups,
    isActive,
    collapsed,
    toggleCollapsed,
    lockedInfo,
    provisionalWindowActive,
    isAdmin,
  };
};

export const useRedirectIfNavLocked = (key: string) => {
  const { lockedInfo, isAdmin } = useSidebarNav();
  const router = useRouter();
  const locked = Boolean(lockedInfo[key]) && !isAdmin;

  useEffect(() => {
    if (locked) {
      router.replace(PRIVATE_ROUTES.HOME.path);
    }
  }, [locked, router]);

  return locked;
};

export default useSidebarNav;
