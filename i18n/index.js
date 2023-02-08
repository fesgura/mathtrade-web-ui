import ES_AR from "./lang/ES_AR.json";

const languages = { ES_AR };

// HARDCODED NOW:
const currentLanguage = "ES_AR";

export const getI18Ntext = (id) => {
  let text = languages[currentLanguage][id];

  if (id.length && typeof languages[currentLanguage][id] === "undefined") {
    text = "NOT TRANSLATED";
    console.warn(
      `I18N: "${id}" does not found in ${currentLanguage} language.`
    );
  }

  return text;
};

const I18N = ({ id = "", forHtml }) => {
  return forHtml ? (
    <span dangerouslySetInnerHTML={{ __html: getI18Ntext(id) }} />
  ) : (
    <>{getI18Ntext(id)}</>
  );
};

export default I18N;
