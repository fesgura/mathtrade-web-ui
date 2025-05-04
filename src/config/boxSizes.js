export const boxSizeIdToReview = 0;

const boxSizes = {
  toReview: {
    description: "boxSizes.description.toReview",
    value: boxSizeIdToReview,
    text: "boxSizes.title.toReview",
    valueA: 0,
    valueB: 0,
    isOption: false,
  },
  small: {
    description: "boxSizes.description.small",
    value: 1,
    text: "boxSizes.title.small",
    valueA: 15,
    valueB: 15,
    isOption: true,
  },
  medium: {
    description: "boxSizes.description.medium",
    value: 2,
    text: "boxSizes.title.medium",
    valueA: 15,
    valueB: 25,
    isOption: true,
  },
  normal: {
    description: "boxSizes.description.normal",
    value: 3,
    text: "boxSizes.title.normal",
    valueA: 25,
    valueB: 40,
    isOption: true,
  },
  large: {
    description: "boxSizes.description.large",
    value: 4,
    text: "boxSizes.title.large",
    valueA: 40,
    valueB: 9999,
    isOption: true,
  },
  noBox: {
    description: "boxSizes.description.noBox",
    value: 5,
    text: "boxSizes.title.noBox",
    valueA: 0,
    valueB: 0,
    isOption: true,
  },
};

export const boxSizesValues = Object.values(boxSizes).reduce((obj, v) => {
  obj[v.value] = v;
  return obj;
}, {});

export const boxSizesOptions = Object.values(boxSizes)
  .filter(({ isOption }) => isOption)
  .map((v) => ({
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
