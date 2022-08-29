import { languageTranslations, listDependencyTexts } from "config";
import storage from "./storage";

export const locationsToOptions = (locations) => {
  if (!locations) {
    return [];
  }

  return locations.map((location) => {
    return {
      text: location.name,
      value: location.id,
    };
  });
};
export const translateText = (str) => {
  const dicc = {
    ...languageTranslations,
  };

  return dicc[str] || "Otro (no listado)";
};

export const getMathtradeStored = () => {
  const mathtrade = storage.getFromStore("mathtrade");

  return mathtrade;
};
// ELEMENTS
const createVersionList = (versions, defaultThumbnail) => {
  const list = [];

  versions.forEach((version) => {
    const { thumbnail, id, yearpublished, name, link } = version;

    const year =
      yearpublished && yearpublished.value ? yearpublished.value : "";
    const version_name = (name && name.value ? name.value : "") + ` (${year})`;

    let publisher = "";

    const languageList = [];

    if (link && link.length) {
      link.forEach((li) => {
        if (li.type.indexOf("publisher") >= 0) {
          publisher = li.value;
        }
        if (li.type.indexOf("language") >= 0) {
          languageList.push(translateText(li.value));
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
        thumbnail,
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
    value: "",
    votes: "",
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
  //console.log("BGGelement", BGGelement);

  if (!BGGelement) {
    return null;
  }

  const BGGdata = { versionList: [] };
  if (BGGelement.versions && BGGelement.versions.item) {
    const versions =
      typeof BGGelement.versions.item.forEach === "undefined"
        ? [BGGelement.versions.item]
        : BGGelement.versions.item;
    BGGdata.versionList = createVersionList(
      versions,
      BGGelement.thumbnail || ""
    );
  }
  // dependency
  BGGdata.dependency = getDependency(BGGelement);

  // stats
  BGGdata.stats = getStats(BGGelement);

  BGGdata.thumbnail = BGGelement.thumbnail || "";
  return BGGdata;
};

// const listDependencyTexts = [
//   {
//     min: "Ninguna",
//     max: "Ninguna: sin texto en juego",
//   },
//   {
//     min: "Poco texto",
//     max: "Pocos textos, fáciles de memorizar",
//   },
//   {
//     min: "Moderada",
//     max: "Moderada: es necesaria una hoja de referencia",
//   },
//   {
//     min: "Uso extensivo de texto",
//     max: "Uso extensivo de texto: se necesita conocer el idioma para poder jugar",
//   },
//   {
//     min: "Injugable en otro idioma",
//     max: "Injugable en otro idioma",
//   },
// ];

export const dependencyToData = (dependency) => {
  if (!dependency || dependency.value.length === 0) {
    return {
      most: "Sin datos",
      list: [],
    };
  }

  return {
    most: listDependencyTexts[parseInt(dependency.value, 10)].min,
    list: dependency.votes.split("|").map((vote, i) => {
      return {
        value: parseInt(vote, 10),
        text: listDependencyTexts[i].max,
      };
    }),
  };
};

export const getUniqueId = () => new Date().valueOf();
