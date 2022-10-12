import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import storeDataReducer from "./slices/storeData";

export const store = configureStore({
  reducer: {
    storeData: storeDataReducer,
  },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
