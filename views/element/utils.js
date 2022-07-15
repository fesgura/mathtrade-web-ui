import { translateText } from "utils";

export const createVersionList = (versions) => {
  const list = [];

  versions.forEach((version) => {
    const { thumbnail, id, yearpublished, name, link } = version;

    const year =
      yearpublished && yearpublished.value ? yearpublished.value : "";
    const version_name = (name && name.value ? name.value : "") + ` (${year})`;

    let language = "";
    let publisher = "";

    if (link && link.length) {
      link.forEach((li) => {
        if (li.type.indexOf("publisher") >= 0) {
          publisher = li.value;
        }
        if (li.type.indexOf("language") >= 0) {
          language = translateText(li.value);
        }
      });
    }

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

export const getDependency = (BGGelement) => {
  if (BGGelement && BGGelement.poll && BGGelement.poll.length) {
    const dependencyPoll = BGGelement.poll.filter((p) => {
      return p.name === "language_dependence";
    });

    if (dependencyPoll[0]) {
      const results = dependencyPoll[0]?.results?.result;
      if (results && results.length) {
        let txt = "";
        console.log(results);
        results
          .sort((a, b) => {
            return a.level < b.level ? -1 : 1;
          })
          .forEach((r) => {
            txt += "|" + (r.numvotes || "0");
          });
        return txt.substring(1);
      }
    }
  }
  return "";
};

const listDependencyTexts = [
  {
    min: "Ninguna",
    max: "Ninguna: sin texto en juego",
  },
  {
    min: "Algunos textos",
    max: "Algunos textos del juego, fáciles de memorizar",
  },
  {
    min: "Moderada",
    max: "Moderada: textos en el juego que necesitan hoja de referencia",
  },
  {
    min: "Extensivo uso de texto",
    max: "Extensivo uso de texto: se necesita conocer el idioma para poder jugar",
  },
  {
    min: "Injugable en otro idioma",
    max: "Injugable en otro idioma",
  },
];

export const dependencyToData = (dependencyStr) => {
  if (dependencyStr && dependencyStr !== "" && dependencyStr.indexOf("|") > 0) {
    const dependencyStrList = dependencyStr.split("|");
    let most = "Sin datos";
    let mostNum = 0;
    const list = dependencyStrList.map((str, i) => {
      const value = parseInt(str, 10);
      if (value > mostNum) {
        mostNum = value;
        most = listDependencyTexts[i].min;
      }
      return {
        value,
        text: listDependencyTexts[i].max,
      };
    });
    return {
      most,
      list,
    };
  }
  return {
    most: "Sin datos",
    list: [],
  };
};
