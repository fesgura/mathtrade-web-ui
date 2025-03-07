import { useCallback, useMemo, useState } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import ElementView from "./elementView";
import ElementEditor from "../editor";

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

const ElementMy = ({ element }) => {
  const elementAdapted = useMemo(() => {
    const {
      id,
      name: title,
      thumbnail,
      game,
      bgg_version_id,
      publisher,
      year,
      language,
    } = element;

    const type = getI18Ntext(`element-type-badge-${game?.type || 1}`);
    const notGame = game?.bgg_id === 23953 || game?.bgg_id < 0;

    return {
      id,
      type,
      game,
      thumbnail,
      title,
      titleLink: notGame
        ? null
        : `https://boardgamegeek.com/boardgame/${game?.bgg_id}/`,
      publisher: publisher && year ? `${publisher} (${year})` : null,
      publisherLink:
        bgg_version_id && bgg_version_id === "other"
          ? null
          : `https://boardgamegeek.com/boardgameversion/${bgg_version_id}/`,
      language: getLanguageListText(language),
      elementRaw: element,
      notGame,
    };
  }, [element]);

  // EDITING MODE *************************************/
  const [editingMode, setEditingMode] = useState(false);
  const toggleEditingMode = useCallback(() => {
    setEditingMode((v) => !v);
  }, []);
  // end EDITING MODE *************************************/

  return editingMode ? (
    <ElementEditor
      element={elementAdapted}
      toggleEditingMode={toggleEditingMode}
    />
  ) : (
    <ElementView
      element={elementAdapted}
      toggleEditingMode={toggleEditingMode}
      //isEditable={isEditable}
    />
  );
};
export default ElementMy;
