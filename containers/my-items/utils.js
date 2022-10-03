export const setItemTitle = (item, data) => {
  let txt = "";

  if (item && item.elements && item.elements.length) {
    item.elements.forEach((element) => {
      txt += `${element.name} + `;
    });
  }

  txt += data.name;

  return txt;
};
