import { getI18Ntext } from "@/i18n";
import { noBGGgame } from "@/config/no-bgggame";
import { dependencyLabel } from "@/config/dependencyTypes";

// Ratings BGG
const ratingsBGG = {
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

const dependencyToData = (dependency) => {
  // dependency.votes is the backend's Game.dependency_votes JSONField, a
  // {level: voteCount} object (e.g. {"1": 12, "2": 3}), not a delimited string.
  const totalVotes = Object.values(dependency.votes || {}).reduce(
    (accumulator, currentValue) => {
      return accumulator + (parseInt(currentValue, 10) || 0);
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
const roundRate = (value) => Math.round((value || 0) * 10) / 10;

export const getStatsOfElement = (element) => {
  if (!element) {
    return {
      rate: 1,
      rateColor: ratingsBGG[0],
      averageRate: null,
      averageRateColor: ratingsBGG[0],
      rateVotes: 1,
      weight: 1,
      weightVotes: 1,
      dependency: {
        most: getI18Ntext("NoData"),
        list: [],
      },
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

  const toNullableInt = (value) => {
    if (value === null || value === undefined || value === "") return null;
    const n = parseInt(value, 10);
    return Number.isNaN(n) ? null : n;
  };

  return {
    isInBGG: `${bgg_id}` !== noBGGgame.element.bgg_id,
    rate: roundRate(rate),
    rateColor: ratingsBGG[Math.floor(rate || 0)],
    averageRate: hasAverage ? roundRate(average_rate) : null,
    averageRateColor: hasAverage
      ? ratingsBGG[Math.floor(average_rate || 0)]
      : ratingsBGG[0],
    rateVotes: parseInt(rate_votes || 0, 10),
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
