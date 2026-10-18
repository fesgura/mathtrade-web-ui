"use client";
import { createContext, useMemo, type ReactNode } from "react";
import { getI18Ntext } from "@/i18n";
import { formatPublisherWithYear, withYearSuffix } from "@/utils/text";

export const ElementContext = createContext({
  element: null as any,
});

const getLanguageListText = (lang: unknown = "") => {
  if (!lang) {
    return "";
  }
  return `${lang}`
    .split(",")
    .map((item) => {
      return getI18Ntext(`language.${item.trim()}`);
    })
    .join(", ");
};

export const ElementContextProvider = ({
  elementRaw = {},
  children = null,
}: {
  elementRaw?: any;
  children?: ReactNode;
}) => {
  const element = useMemo(() => {
    const {
      id: math_element_id,
      element: elementOriginal = {},
      box_status,
      component_status,
      comment,
      images,
    } = elementRaw || {};

    const {
      id,
      name: title,
      thumbnail,
      game,
      bgg_version_id,
      publisher,
      year,
      language,
      box_size,
      version_nickname,
    } = elementOriginal;

    const type = getI18Ntext(`element-type-badge-${game?.type || 1}`);
    const notGame = game?.bgg_id === 23953 || game?.bgg_id < 0;

    return {
      id,
      type,
      typeNum: game?.type || 1,
      game,
      thumbnail,
      title: withYearSuffix(title, year, game?.year),
      titleRaw: title,
      titleLink: notGame
        ? null
        : `https://boardgamegeek.com/boardgame/${game?.bgg_id}/`,
      bgg_version_id,
      year,
      publisherRaw: publisher || "",
      publisher: formatPublisherWithYear(publisher, year),
      versionNickname: `${version_nickname ?? ""}`.trim() || null,
      publisherLink:
        bgg_version_id && bgg_version_id === "other"
          ? null
          : `https://boardgamegeek.com/boardgameversion/${bgg_version_id}/`,
      language: getLanguageListText(language),
      languageRaw: language,
      elementRaw,
      notGame,
      extraData: {
        box_status,
        component_status,
        comment,
        images,
      },
      math_element_id: math_element_id || null,
      offered: elementOriginal?.offered || null,
      box_size,
    };
  }, [elementRaw]);

  return (
    <ElementContext.Provider
      value={{
        element,
      }}
    >
      {children}
    </ElementContext.Provider>
  );
};
