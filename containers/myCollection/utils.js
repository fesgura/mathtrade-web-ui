import { cropWord } from "utils";

export const setItemTitle = (item, data, isCreate, isDeleting) => {
  //const newData
  const listNames = [];

  if (item && item.elements && item.elements.length) {
    listNames = item.elements
      .filter((elem) => {
        if (isDeleting && elem.id === data.id) {
          return false;
        }
        return true;
      })
      .map((element) => {
        return element.name;
      });
  }
  if (isCreate) {
    listNames.push(data.name);
  }

  const txt = listNames.join(" + ");
  return cropWord(txt, 196, "...");
};
