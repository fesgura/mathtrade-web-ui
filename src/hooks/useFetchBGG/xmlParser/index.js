import xml2json from "./xml2json";

const preSanity = [
  {
    reg: new RegExp("&quot;", "g"),
    repl: "'",
  },
];

const xmlParser = (str) => {
  let strSanitized = str;

  preSanity.forEach((o) => {
    strSanitized = strSanitized.replace(o.reg, o.repl);
  });

  const jsonStr = xml2json(strSanitized, "").replace(/\\/g, "");

  return JSON.parse(jsonStr);
};

export default xmlParser;
