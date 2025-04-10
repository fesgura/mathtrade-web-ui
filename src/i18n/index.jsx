import es_AR from "./languages/es_AR.json";

const languages = { es_AR };

// HARDCODED NOW:
const currentLanguage = "es_AR";

export const getI18Ntext = (str, values = []) => {
  let text = languages[currentLanguage][str];
  if (typeof text === "undefined") {
    console.warn(
      `I18N: "${str}" does not found in ${currentLanguage} language.`
    );
    return str;
  }

  if (values.length) {
    const textArray = text.split("$$$");

    //if (textArray.length === values.length + 1) {
    text = "";
    // values.forEach((v, i) => {
    //   text += textArray[i] + v;
    // });
    textArray.forEach((t, i) => {
      text += t;
      if (i === textArray.length - 1) {
        return;
      }
      text += typeof values[i] === "undefined" ? "$$$" : values[i];
    });
    //text += textArray[textArray.length - 1];
    //}
  }
  return text;
};

const I18N = ({ id = "", values }) => {
  let text = getI18Ntext(id, values);

  return text.indexOf("<") >= 0 ? (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  ) : (
    <>{text}</>
  );
};

export default I18N;
