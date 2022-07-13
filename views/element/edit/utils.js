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
