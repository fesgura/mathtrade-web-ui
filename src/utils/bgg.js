import { getI18Ntext } from "@/i18n";
import { NO_RANK_VALUE } from "@/config/no-bgggame";

export const extractBGGdataFromElement = (data) => {
  if (!data || !data.items || !data.items.item) {
    return null;
  }

  const bggElement = data.items.item;

  const {
    id: bgg_id,
    image: thumbnail,
    type: typeString,
    versions: versionList,
    name: namesList,
    poll,
    statistics,
  } = bggElement;

  // NAMES *******************************************************

  const namesComp = (() => {
    let primary_name = "";

    const namesArr =
      typeof namesList.forEach === "undefined" ? [namesList] : namesList;

    const names = namesArr
      .map((n) => {
        const { type, value } = n;
        if (type === "primary") {
          primary_name = value;
        }
        return value;
      })
      .join(",");

    return { primary_name, names };
  })();

  // TYPES *******************************************************
  const typesPool = {
    boardgame: 1,
    boardgameexpansion: 2,
  };

  // POLL *******************************************************
  // Dependency
  const dependencyPoll = (() => {
    const list = poll
      ? poll.filter((p) => {
          return p.name === "language_dependence";
        })
      : [];

    if (list[0]) {
      const results = list[0]?.results?.result;

      if (results && results.length) {
        let txt = "";

        results.sort((a, b) => {
          return a.level < b.level ? -1 : 1;
        });

        let most = 0;
        let max = -1;

        results.forEach((r, i) => {
          const num = parseInt(r.numvotes, 10);
          if (num > max) {
            max = num;
            most = i;
          }

          txt += "|" + (`${num}` || "0");
        });

        return {
          dependency: most || "0",
          dependency_votes: txt.substring(1),
        };
      }
    } else {
      return {
        dependency: "0",
        dependency_votes: "0|0|0|0|0",
      };
    }
  })();

  // STATISTIC
  const stats = (() => {
    let rank = NO_RANK_VALUE;
    let rate = null;
    let rate_votes = null;
    let weight = null;
    let weight_votes = null;
    //
    if (statistics && statistics.ratings) {
      const { ratings } = statistics;

      // rank
      if (ratings?.ranks?.rank) {
        const rankArr =
          typeof ratings.ranks.rank.forEach === "undefined"
            ? [ratings.ranks.rank]
            : ratings.ranks.rank;
        const rankFiltered = rankArr.filter((ra) => {
          return ra.name === "boardgame";
        });
        if (rankFiltered[0]) {
          const newRank = parseInt(rankFiltered[0].value, 10);
          if (!isNaN(newRank)) {
            rank = newRank;
          }
        }
      }
     
      // rate
      if (ratings.average) {
        rate = ratings.average.value;
      }
      // rate_votes
      if (ratings.usersrated) {
        rate_votes = ratings.usersrated.value;
      }
      // weight
      if (ratings.averageweight) {
        weight = ratings.averageweight.value;
      }
      // averageweight
      if (ratings.numweights) {
        weight_votes = ratings.numweights.value;
      }
    }

    return { rank, rate, rate_votes, weight, weight_votes };
  })();

  // players
  const players = (() => {
    const {
      maxplayers: max_players,
      minplayers: min_players,
      maxplaytime: max_playtime,
      minplaytime: min_playtime,
      playingtime: playing_time,
    } = bggElement;

    const elem = {
      max_players,
      min_players,
      max_playtime,
      min_playtime,
      playing_time,
    };

    const o = {};

    for (let a in elem) {
      o[a] = elem[a] && elem[a].value ? elem[a].value : null;
    }

    return o;
  })();

  // versions
  const versions = (() => {
    let list = [];
    if (versionList && versionList.item) {
      const listRaw =
        typeof versionList.item.forEach === "undefined"
          ? [versionList.item]
          : versionList.item;

      list = listRaw.map((version) => {
        const { thumbnail, id: value, yearpublished, name, link } = version;

        const year =
          yearpublished && yearpublished.value ? yearpublished.value : "";

        const text = (() => {
          let n = "";
          if (typeof name.forEach === "undefined") {
            n = name && name.value ? name.value : "";
          } else {
            const namesFiltered = name.filter((na) => {
              return na.type === "primary";
            });
            if (namesFiltered[0]) {
              n = namesFiltered[0]?.value;
            } else {
              n = name[0]?.value;
            }
          }
          return n + ` (${year})`;
        })();

        let publisher = "";

        const languageList = [];

        if (link && link.length) {
          link.forEach((li) => {
            if (li.type.indexOf("publisher") >= 0) {
              publisher = li.value;
            }
            if (li.type.indexOf("language") >= 0) {
              languageList.push(li.value);
            }
          });
        }
        const language = languageList.join(",");

        return { value, text, thumbnail, publisher, language, year };
      });
    }
    getI18Ntext;
    return list.concat([
      {
        value: "OTHER",
        text: getI18Ntext("Another.Version"),
        thumbnail,
        publisher: "",
        language: "",
        year: "",
        highlighted: true,
      },
    ]);
  })();

  ////////////////
  const result = {
    element: { bgg_id, thumbnail },
    game: {
      bgg_id,
      ...namesComp,
      type: typesPool[typeString] || 1,
      ...dependencyPoll,
      ...stats,
      ...players,
    },
    versions,
  };

  return result;
};
