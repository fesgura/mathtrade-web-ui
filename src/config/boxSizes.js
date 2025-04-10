import { getI18Ntext } from "@/i18n";

const boxSizes = {
  small: {
    description: "boxSizes.description.small",
    value: 1,
    text: "boxSizes.title.small",
    maxWidth: 14,
    maxLarge: 20,
    maxHeight: 4,
    limitTextDescription: "20",
  },
  medium: {
    description: "boxSizes.description.medium",
    value: 2,
    text: "boxSizes.title.medium",
    maxWidth: 20,
    maxLarge: 29,
    maxHeight: 7,
    limitTextDescription: "20-25",
  },
  normal: {
    description: "boxSizes.description.normal",
    value: 3,
    text: "boxSizes.title.normal",
    maxWidth: 30,
    maxLarge: 30,
    maxHeight: 9,
    limitTextDescription: "30×30",
  },
  large: {
    description: "boxSizes.description.large",
    value: 4,
    text: "boxSizes.title.large",
    maxWidth: 50,
    maxLarge: 60,
    maxHeight: 20,
    limitTextDescription: "30×30",
  },
};

export const boxSizesValues = Object.values(boxSizes).reduce((obj, v) => {
  obj[v.value] = v;
  return obj;
}, {});

export const boxSizesOptions = Object.values(boxSizes).map((v) => ({
  value: v.value,
  text: v.text,
}));

/*
Cajas:
- <= A5
- tipo A4
- tipo cuadrada\estandard
- Grande (más alta de 10cm / mas larga de 30)

*/
