import { listDependencyTexts } from "config";
import { getI18Ntext } from "i18n";
import moment from "moment";
import "moment/locale/es";

export const locationsToOptions = (locations) => {
  if (!locations) {
    return [];
  }

  const pool = {};

  locations.forEach((location) => {
    if (!pool[location.province]) {
      pool[location.province] = [];
    }
    pool[location.province].push({
      text: `${location.name}`,
      value: location.id,
    });
  });

  const locs = [];

  for (var a in pool) {
    locs.push({
      text: a,
      value: pool[a],
    });
  }

  return locs;
};

// ELEMENTS
const createVersionList = (versions, defaultThumbnail) => {
  const list = [];

  versions.forEach((version) => {
    const { thumbnail, id, yearpublished, name, link } = version;

    let year = yearpublished && yearpublished.value ? yearpublished.value : "";
    //  year = parseInt(year, 10) < 1 ? "1" : year;
    const version_name = (() => {
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

    list.push({
      formData: {
        language,
        publisher,
        year,
        version_name,
      },
      versionData: {
        thumbnail: thumbnail || "none",
        bgg_version_id: id,
      },
    });
  });

  list.push({
    formData: {
      language: "",
      publisher: "",
      year: "",
      version_name: "Otra, no listada",
    },
    versionData: {
      thumbnail: defaultThumbnail,
      bgg_version_id: "other",
    },
  });

  return list;
};
export const getVersionNameFromId = (bgg_version_id, versionList) => {
  if (
    !bgg_version_id ||
    bgg_version_id === "" ||
    !versionList ||
    versionList.length === 0
  ) {
    return { version_name: "" };
  }
  const version = versionList.filter((v) => {
    return bgg_version_id === v.versionData.bgg_version_id;
  });
  if (version[0]) {
    return { version_name: version[0].formData.version_name };
  } else {
    return { version_name: "" };
  }
};

const getDependency = (BGGelement) => {
  if (BGGelement.poll && BGGelement.poll.length) {
    const dependencyPoll = BGGelement.poll.filter((p) => {
      return p.name === "language_dependence";
    });

    if (dependencyPoll[0]) {
      const results = dependencyPoll[0]?.results?.result;

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
          value: most,
          votes: txt.substring(1),
        };
      }
    }
  }
  return {
    value: "0",
    votes: "0|0|0|0|0",
  };
};
const getStats = (BGGelement) => {
  let rate = "";
  let rate_votes = "";
  let weight = "";
  let weight_votes = "";

  if (BGGelement.statistics && BGGelement.statistics.ratings) {
    if (BGGelement.statistics.ratings.average) {
      rate = BGGelement.statistics.ratings.average.value;
    }
    if (BGGelement.statistics.ratings.usersrated) {
      rate_votes = BGGelement.statistics.ratings.usersrated.value;
    }
    if (BGGelement.statistics.ratings.averageweight) {
      weight = BGGelement.statistics.ratings.averageweight.value;
    }
    if (BGGelement.statistics.ratings.numweights) {
      weight_votes = BGGelement.statistics.ratings.numweights.value;
    }
  }
  return {
    rate,
    rate_votes,
    weight,
    weight_votes,
  };
};
export const processBGGdata = (BGGelement) => {
  if (!BGGelement) {
    return null;
  }

  const BGGdata = { versionList: [], bgg_id: BGGelement.id };

  let versions = [];
  if (BGGelement.versions && BGGelement.versions.item) {
    versions =
      typeof BGGelement.versions.item.forEach === "undefined"
        ? [BGGelement.versions.item]
        : BGGelement.versions.item;
  }
  BGGdata.versionList = createVersionList(
    versions,
    BGGelement.thumbnail || "none"
  );

  // dependency
  BGGdata.dependency = getDependency(BGGelement);

  // stats
  BGGdata.stats = getStats(BGGelement);

  BGGdata.rank = 0;

  //rank
  if (BGGelement?.statistics?.ratings?.ranks?.rank) {
    const rankArr =
      typeof BGGelement.statistics.ratings.ranks.rank.forEach === "undefined"
        ? [BGGelement.statistics.ratings.ranks.rank]
        : BGGelement.statistics.ratings.ranks.rank;
    const rankFiltered = rankArr.filter((ra) => {
      return ra.name === "boardgame";
    });
    if (rankFiltered[0]) {
      const newRank = parseInt(rankFiltered[0].value, 10);
      if (!isNaN(newRank)) {
        BGGdata.rank = newRank;
      }
    }
  }

  BGGdata.thumbnail = BGGelement.thumbnail || "";
  return BGGdata;
};

export const dependencyToData = (dependency) => {
  if (dependency?.value?.length === 0) {
    return {
      most: "Sin datos",
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
};

export const getUniqueId = () => new Date().valueOf();

export const getTitleFromItem = (item) => {
  let newTitle = "";
  item?.elements?.forEach((element) => {
    newTitle += " + " + element?.name;
  });

  return newTitle.substring(3);
};

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getTextColorByBackgroundColor = (bg_color) => {
  const rgb_bg = hexToRgb(bg_color);
  if (rgb_bg) {
    const brightness = Math.round(
      (rgb_bg.r * 299 + rgb_bg.g * 587 + rgb_bg.b * 114) / 1000
    );
    return brightness > 160 ? "#000" : "#FFF";
  } else {
    return "#FFF";
  }
};

export const cropWord = (str, lng, suffix) => {
  const sf = suffix && str.length > lng ? suffix : "";
  return str.substring(0, lng) + sf;
};

export const wantsFromAPItoWantList = (wantListFromAPI) => {
  const list = wantListFromAPI.map((w) => {
    const { id, bgg_id, dup_protection, items, wants, availables, name } = w;

    let type = "item";

    if (!bgg_id) {
      type = wants.length === 1 ? "item" : "group";
    } else {
      type = "game";
    }

    const availableWantItems =
      type === "game" ? [...wants, ...availables] : [...wants];

    return {
      id,
      contentToEdit: {
        bgg_id,
        name: name + " (" + id + ")",
        dup_protection,
        want_ids: wants.map((want) => {
          return want.id;
        }),
        item_ids: items.map((item) => {
          return item.id;
        }),
      },

      status: "NOT_CHANGED",
      type, // item, group, game
      //
      availableWantItems,
      extended: true,
    };
  });
  return list.sort((a, b) => {
    return a.contentToEdit.item_ids.length > b.contentToEdit.item_ids.length
      ? -1
      : 1;
  });
};

export const getElementByFilter = (collection, method) => {
  const arrayCollection = collection.filter(method);
  return arrayCollection[0] || null;
};

export const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const getLanguageListText = (lang) => {
  if (!lang) {
    return "";
  }
  return lang
    .split(",")
    .map((lang) => {
      return getI18Ntext(`language.${lang.trim()}`);
    })
    .join(", ");
};
export const getStatsOfElement = (element) => {
  const o = {
    stats: {
      rate: 1,
      rateClass: 1,
      rateVotes: 1,
      weight: 1,
      weightVotes: 1,
    },
    dataDependency: {
      most: getI18Ntext("NoData"),
      list: [],
    },
  };

  if (!element) {
    return o;
  }

  o.stats = {
    rate: Math.round(element.rate * 10) / 10,
    rateClass: Math.floor(element.rate),
    rateVotes: parseInt(element.rate_votes, 10),
    weight: Math.round(element.weight * 100) / 100,
    weightVotes: parseInt(element.weight_votes, 10),
  };
  o.dataDependency = dependencyToData({
    value: element?.dependency || 0,
    votes: element.dependency_votes || "",
  });
  return o;
};

export const formatDateString = (dateString) => {
  const m = moment(dateString);
  return {
    day: m.format("DD MMMM YYYY"),
    hour: m.format("h:mm"),
  };
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const usersToOptions = (users, forTrades) => {
  if (!users || !users.length) {
    return [];
  }

  return users
    .sort((a, b) => {
      return a.last_name.toLowerCase() > b.last_name.toLowerCase() ? 1 : -1;
    })
    .map((user) => {
      let text = `${capitalize(user.first_name)} ${capitalize(
        user.last_name
      )} (${user?.location?.name})`;
      let trades = 0;
      if (forTrades) {
        const trades = user?.trades || 0;
        text += ` - ${trades === 0 ? "Sin" : trades} ${
          trades === 1 ? "intercambio" : "intercambios"
        }`;
      }

      return {
        value: user.id,
        text,
        trades,
      };
    });
};

export const dateToString = (d, toStr) => {
  let m;
  if (d) {
    m = moment(d);
  } else {
    m = moment();
  }
  moment.locale("es");
  const a = m.format("DD MMMM H:mm").split(" ");

  const o = {
    day: parseInt(a[0], 10),
    month: capitalize(a[1]),
    hour: a[2] + "hs",
  };

  if (toStr) {
    return `${o.day} ${o.month}, ${o.hour}`;
  }

  return o;
};
