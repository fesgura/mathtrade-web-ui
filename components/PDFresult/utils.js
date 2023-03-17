import { cropWord } from "utils";

export const processList = (list) => {
  if (!list) {
    return [];
  }

  const listTo = [
    {
      rows: [
        {
          quads: [],
        },
      ],
    },
  ];
  let indPage = 0;
  let indRow = 0;

  list.forEach((elem, k) => {
    listTo[indPage].rows[indRow].quads.push(elem);
    if (k < list.length - 1) {
      if (listTo[indPage].rows[indRow].quads.length === 2) {
        if (indRow < 2) {
          listTo[indPage].rows.push({ quads: [] });
          indRow++;
        } else {
          listTo.push({
            rows: [
              {
                quads: [],
              },
            ],
          });
          indPage++;
          indRow = 0;
        }
      }
    }
  });
  return listTo;
};

export const dataToTag = (data) => {
  return {
    id: 165,
    name: cropWord("Indian Summer", 40, "..."),
    from: "LOLCESE (Córdoba)",
    to: "GENEZE_CB (AMBA)",
    mesa: "687",
    via: true,
  };
};
