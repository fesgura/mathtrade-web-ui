import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORE_DEFAULT = {
  data: {
    user: null,
    mathtrade: null,
    membership: null,
    auth: {
      expires: 0,
      token: null,
    },
    lang: "es",
  },
  locations: null,
};

const STORAGE_NAME = "MT_ARG_STORE";
const OPTIONS_NAME = "MT_ARG_OPTIONS";

export const DAYS_EXPIRE_TOKEN = 1;

export const useOptions = create(
  persist(
    (set) => ({
      // Options Data
      filters_item: {},
      filters_game: {},
      filters_wants: {},
      filters_collection: {},
      filters_myoffer: {},
      options: {},
      //
      // Options Actions
      updateFilters: (data, elementName) =>
        set((state) => {
          const filterName = `filters_${elementName}`;
          const newFilters = {
            ...state[filterName],
            ...data,
          };

          for (let i in newFilters) {
            if (newFilters[i] === undefined) {
              delete newFilters[i];
            }
          }

          return { [filterName]: newFilters };
        }),
      updateOptions: (data) =>
        set((state) => {
          const newOptions = {
            ...state.options,
            ...data,
          };

          for (let i in newOptions) {
            if (newOptions[i] === undefined) {
              delete newOptions[i];
            }
          }

          return { options: newOptions };
        }),
    }),
    { name: OPTIONS_NAME }
  )
);

export const useStore = create(
  persist(
    (set) => ({
      ...STORE_DEFAULT,
      //updateStore: (newData) => set({ data: newData }),
      updateStore: (elementName, data) =>
        set((state) => {
          return { [elementName]: data };
        }),
      clearStore: () => set({ ...STORE_DEFAULT }),
    }),
    { name: STORAGE_NAME }
  )
);
