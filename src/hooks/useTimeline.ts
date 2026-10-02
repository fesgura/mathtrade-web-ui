import { useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { formatMilestoneDate } from "@/utils/dateUtils";

export type Venue = { name: string; address: string; url: string };

const MILESTONE_TEXT: Record<string, { title: string; color: number }> = {
  start_date: {
    title: "timeline.start",
    color: 1,
  },
  // Optional: only shown when the edition sets it.
  signup_close_date: {
    title: "timeline.signupClose",
    color: 1,
  },
  freeze_geek_date: {
    title: "timeline.geek",
    color: 1,
  },
  freeze_wants_date: {
    title: "timeline.want",
    color: 2,
  },
  provisional_results_date: {
    title: "timeline.provisional",
    color: 3,
  },
  show_results_date: {
    title: "timeline.res",
    color: 4,
  },
  meeting_date: {
    title: "timeline.meet",
    color: 4,
  },
};

export type MilestoneState = "past" | "next" | "future";

export type Milestone = {
  key: string;
  title: string;
  color: number;
  // Only on the meeting, when the edition has a venue (set in the admin panel).
  venue?: Venue | null;
  dateRaw: string;
  time: number;
  date: { weekday: string; dayMonth: string; time: string };
  state: MilestoneState;
};

// The edition's stages, sorted by date. "today" is compared with real
// timestamps (not date strings), so it's right in any time zone.
const useTimeline = () => {
  const { mathtrade } = useContext(PageContext);

  return useMemo(() => {
    if (!mathtrade) {
      return { milestones: [] as Milestone[], next: null };
    }
    const now = Date.now();
    const venue: Venue | null = mathtrade.venue_name
      ? {
          name: mathtrade.venue_name,
          address: mathtrade.venue_address || "",
          url: mathtrade.venue_map_url || "",
        }
      : null;

    const sorted = Object.entries(MILESTONE_TEXT)
      .map(([key, value]) => {
        const dateRaw = mathtrade[key];
        // Receipts are also due when loading ends, if the edition asks for one.
        if (key === "freeze_geek_date" && mathtrade.contribution_amount) {
          value = { ...value, title: "timeline.geekContribution" };
        }
        const time = dateRaw ? new Date(dateRaw).getTime() : NaN;
        return {
          key,
          ...value,
          dateRaw,
          time,
          venue: key === "meeting_date" ? venue : null,
        };
      })
      .filter(({ time }) => Number.isFinite(time))
      .sort((a, b) => a.time - b.time);

    const nextIndex = sorted.findIndex(({ time }) => time > now);

    const milestones: Milestone[] = sorted.map((m, i) => ({
      ...m,
      date: formatMilestoneDate(m.dateRaw)!,
      state:
        nextIndex < 0 || i < nextIndex
          ? "past"
          : i === nextIndex
            ? "next"
            : "future",
    }));

    return {
      milestones,
      next: nextIndex >= 0 ? milestones[nextIndex] : null,
    };
  }, [mathtrade]);
};

export default useTimeline;
