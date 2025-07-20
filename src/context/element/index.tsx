"use client";
import { createContext, useMemo } from "react";
import { getI18Ntext } from "@/i18n";

export const ElementContext = createContext({
  element: null,
});

const getLanguageListText = (lang) => {
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

export const ElementContextProvider = ({ elementRaw, children }) => {
  const element = useMemo(() => {
    // const {
    //   id: math_element_id,
    //   element: elementOriginal,
    //   box_status,
    //   component_status,
    //   comment,
    //   images,
    // } = elementRaw;
    // const {
    //   id,
    //   name: title,
    //   thumbnail,
    //   game,
    //   bgg_version_id,
    //   publisher,
    //   year,
    //   language,
    //   box_size,
    // } = elementOriginal;
    // const type = getI18Ntext(`element-type-badge-${game?.type || 1}`);
    // const notGame = game?.bgg_id === 23953 || game?.bgg_id < 0;
    // return { ... }

    if (!elementRaw) return {};
    const {
      id,
      box_status,
      component_status,
      comment,
      title,
      thumbnail_url,
      year_published,
      user,
    } = elementRaw;

    return {
      id,
      type: null, 
      typeNum: null,
      game: null,
      thumbnail: thumbnail_url || null,
      title,
      titleLink: null,
      bgg_version_id: null,
      year_published: year_published || null,
      publisher: null,
      publisherLink: null,
      language: null,
      languageRaw: null,
      elementRaw,
      notGame: null,
      extraData: {
        box_status,
        component_status,
        comment,
        images: null,
      },
      math_element_id: id || null,
      offered: null,
      box_size: null,
      user,
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
