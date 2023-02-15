import ES_AR from "./lang/ES_AR.json";

const languages = { ES_AR };

const defaultText = "NOT TRANSLATED";

// HARDCODED NOW:
const currentLanguage = "ES_AR";

export const getI18Ntext = (id) => {
  let text = languages[currentLanguage][id];

  if (id.length && typeof languages[currentLanguage][id] === "undefined") {
    text = defaultText;
    console.warn(
      `I18N: "${id}" does not found in ${currentLanguage} language.`
    );
  }

  return text;
};

const I18N = ({ id = "", values = [] }) => {
  let text = getI18Ntext(id);

  if (values.length) {
    const textArray = text.split("$$$");
    if (textArray.length === values.length + 1) {
      text = "";
      values.forEach((v, i) => {
        text += textArray[i] + v;
      });
      text += textArray[textArray.length - 1];
    }
  }

  return text && text.indexOf("<") >= 0 ? (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  ) : (
    <>{text}</>
  );
};

export default I18N;
