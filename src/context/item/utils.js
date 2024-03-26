import { getI18Ntext } from "@/i18n";
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

export const processElements = (elementsRaw) => {
  return elementsRaw.map((element) => {
    const { id, thumbnail, game, status } = element;

    const typeNum = game?.type || 1;

    //const type = getI18Ntext(`element-type-badge-${typeNum}`);
    /////////////////////

    ///////////////
    const notGame = game?.bgg_id === 23953 || game?.bgg_id < 0;

    return {
      id,
      // type,
      typeNum,
      game,
      thumbnail,
      title: element.name,
      // titleCropped: cropWord(element.name, 50),
      titleLink: notGame
        ? null
        : `https://boardgamegeek.com/boardgame/${game?.bgg_id}/`,
      publisher:
        element.publisher && element.year
          ? `${element.publisher} (${element.year})`
          : null,
      publisherLink:
        element.bgg_version_id && element?.bgg_version_id === "other"
          ? null
          : `https://boardgamegeek.com/boardgameversion/${element?.bgg_version_id}/`,
      language: getLanguageListText(element.language),
      status: status || null,
      comment:
        element.comment && element.comment.length ? element.comment : null,

      images: element.images && element.images.length ? element.images : null,
      elementRaw: element,
      notGame,
    };
  });
};
