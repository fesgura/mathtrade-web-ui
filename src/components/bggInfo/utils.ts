import { getI18Ntext } from "@/i18n";
import { noBGGgame } from "@/config/no-bgggame";
import { dependencyLabel } from "@/config/dependencyTypes";
import type { BggStats } from "./types";

// Ratings BGG
const ratingsBGG: Record<number, string> = {
  0: "#666e75",
  1: "#b2151f",
  2: "#b2151f",
  3: "#d71925",
  4: "#d71925",
  5: "#5369a2",
  6: "#5369a2",
  7: "#1978b3",
  8: "#1d804c",
  9: "#186b40",
  10: "#186b40",
};
const GRAY = ratingsBGG[0];
export const MIN_VOTES_FOR_AVERAGE_COLOR = 30;

const dependencyToData = (dependency: {
  value: number;
  votes: Record<string, unknown>;
}) => {
  // dependency.votes is the backend's Game.dependency_votes JSONField, a
  // {level: voteCount} object (e.g. {"1": 12, "2": 3}), not a delimited string.
  const totalVotes = Object.values(dependency.votes || {}).reduce<number>(
    (accumulator, currentValue) => {
      return accumulator + (parseInt(String(currentValue), 10) || 0);
    },
    0
  );

  if (totalVotes === 0) {
    return {
      dependency: getI18Ntext("dependencyType.noData"),
      dependencyVotes: 0,
    };
  }

  return {
    dependency: dependencyLabel(dependency?.value || 0),
    dependencyVotes: totalVotes,
  };
};
//
const roundRate = (value: unknown): number =>
  Math.round((Number(value) || 0) * 10) / 10;

/** BGG's bucket: floor of the 1-decimal value (7.96 → "8.0" → 8), gray when
 * missing/0 or with fewer than minVotes votes. */
export const ratingColor = (
  value: number | null,
  votes?: number,
  minVotes = 0
): string => {
  if (value == null || value <= 0) return GRAY;
  if (minVotes && (votes ?? 0) < minVotes) return GRAY;
  const bucket = Math.min(10, Math.max(0, Math.floor(roundRate(value))));
  return ratingsBGG[bucket];
};

export const getStatsOfElement = (
  element: Record<string, any> | null | undefined
): BggStats => {
  if (!element) {
    return {
      rate: 1,
      rateColor: GRAY,
      averageRate: null,
      averageRateColor: GRAY,
      rateVotes: 1,
      weight: 1,
      weightVotes: 1,
      bestPlayers: null,
      minPlayers: null,
      maxPlayers: null,
      categories: [],
      mechanisms: [],
      dependency: getI18Ntext("NoData"),
      dependencyVotes: 0,
    };
  }

  const {
    bgg_id,
    rate,
    average_rate,
    rate_votes,
    weight,
    weight_votes,
    dependency,
    dependency_votes,
    rank,
    best_players,
    min_players,
    max_players,
    categories,
    mechanisms,
  } = element;

  const hasAverage =
    average_rate !== null && average_rate !== undefined && average_rate !== "";

  const toNullableInt = (value: unknown): number | null => {
    if (value === null || value === undefined || value === "") return null;
    const n = parseInt(String(value), 10);
    return Number.isNaN(n) ? null : n;
  };

  const geek = roundRate(rate);
  const rateVotes = parseInt(rate_votes || 0, 10) || 0;
  const averageRate = hasAverage ? roundRate(average_rate) : null;

  return {
    isInBGG: `${bgg_id}` !== noBGGgame.element.bgg_id,
    rate: geek > 0 ? geek : null, // "—" when missing/0
    rateColor: ratingColor(geek > 0 ? geek : null),
    averageRate,
    averageRateColor: ratingColor(
      averageRate,
      rateVotes,
      MIN_VOTES_FOR_AVERAGE_COLOR
    ),
    rateVotes,
    rank,
    weight: Math.round((weight || 0) * 100) / 100,
    weightVotes: parseInt(weight_votes || 0, 10),
    bestPlayers: toNullableInt(best_players),
    minPlayers: toNullableInt(min_players),
    maxPlayers: toNullableInt(max_players),
    categories: Array.isArray(categories) ? categories : [],
    mechanisms: Array.isArray(mechanisms) ? mechanisms : [],
    ...dependencyToData({
      value: dependency || 0,
      votes: dependency_votes || {},
    }),
  };
};
