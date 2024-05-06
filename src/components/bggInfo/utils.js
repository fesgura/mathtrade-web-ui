import { getI18Ntext } from "@/i18n";
import { noBGGgame } from "@/config/no-bgggame";

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

const listDependencyTexts = (function () {
  const o = [];
  let value = 0;
  while (value < 5) {
    o.push({
      min: getI18Ntext(`dependencyType.min.${value}`),
      max: getI18Ntext(`dependencyType.max.${value}`),
      value,
    });
    value++;
  }
  return o;
})();

/* const dependencyToData = (dependency) => {
  if (dependency?.value?.length === 0) {
    return {
      most: getI18Ntext("NoData"),
      list: [],
    };
  }

  return {
    most: listDependencyTexts[parseInt(dependency?.value || 0, 10)].min,
    list: dependency.votes.split("|").map((vote, i) => {
      return {
        value: parseInt(vote, 10),
        text: listDependencyTexts[i].max,
      };
    }),
  };
}; */
const dependencyToData = (dependency) => {
  if (dependency.votes === "0|0|0|0|0") {
    return {
      dependency: getI18Ntext("NoData"),
      dependencyVotes: 0,
    };
  }

  return {
    dependency: listDependencyTexts[parseInt(dependency?.value || 0, 10)].min,
    dependencyVotes: dependency.votes
      .split("|")
      .map((vote) => {
        return parseInt(vote, 10);
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0),
  };
};
//
export const getStatsOfElement = (element) => {
  if (!element) {
    return {
      rate: 1,
      rateColor: ratingsBGG[0],
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
    rate_votes,
    weight,
    weight_votes,
    dependency,
    dependency_votes,
    rank,
  } = element;

  return {
    isInBGG: `${bgg_id}` !== noBGGgame.element.bgg_id,
    rate: Math.round((rate || 0) * 10) / 10,
    rateColor: ratingsBGG[Math.floor(rate || 0)],
    rateVotes: parseInt(rate_votes || 0, 10),
    rank,
    weight: Math.round((weight || 0) * 100) / 100,
    weightVotes: parseInt(weight_votes || 0, 10),
    ...dependencyToData({
      value: dependency || 0,
      votes: dependency_votes || "",
    }),
  };
};
