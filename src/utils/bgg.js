import { getI18Ntext } from "@/i18n";

export const extractBGGdataFromElement = (data) => {
  if (!data) {
    return null;
  }
  const {
    bgg_id,
    thumbnail,
    year: year_published,
    type,
    primary_name,
    alternate_names,
    dependency,
    dependency_votes,
    min_players,
    max_players,
    min_playtime,
    max_playtime,
    rank,
    rate,
    geek_rate,
    weight,
    //
    rate_votes,
    weight_votes,
    versions,
  } = data;

  const namesComp = { primary_name, alternate_names };

  const dependencyPoll = (() => {
    if (!dependency || !dependency_votes) {
      return {
        dependency: "0",
        dependency_votes: "0|0|0|0|0",
      };
    }

    return {
      dependency: `${dependency - 1}`,
      dependency_votes: Object.values({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        ...(dependency_votes || {}),
      }).join("|"),
    };
  })();

  const players = {
    max_players,
    min_players,
    max_playtime,
    min_playtime,
    playing_time: Math.round((max_playtime + min_playtime) / 2),
  };

  // STATISTIC
  const stats = (() => {
    return {
      rank: `${rank || 0}`,
      rate: `${rate || 0}`,
      rate_votes: `${rate_votes || 0}`,
      geek_rate: `${geek_rate || 0}`,
      weight: `${weight || 0}`,
      weight_votes: `${weight_votes || 0}`,
    };
  })();

  /* TEMP */
  const contain_ids = [];
  /* end TEMP */

  const versionsClean = (() => {
    if (!versions) {
      return [];
    }
    const list = versions.map((v) => {
      return {
        value: `${v.bgg_version_id}`,
        text: v.name,
        // An edition without its own picture shows the game's cover.
        thumbnail: v.thumbnail || thumbnail,
        publisher: v.publisher,
        language: Object.values(v.languages).join(", "),
        year: v.yearpublished,
      };
    });

    list.push({
      value: "other",
      text: getI18Ntext("Another.Version"),
      thumbnail,
      publisher: "",
      language: "",
      year: "",
      highlighted: true,
    });

    return list;
  })();

  ////////////////
  const result = {
    element: { bgg_id, thumbnail },
    game: {
      bgg_id,
      year_published,
      game_thumbnail: thumbnail,
      type,
      ...namesComp,
      ...dependencyPoll,
      ...players,
      ...stats,
      contain_ids,
    },
    versions: versionsClean,
  };

  return result;
};
