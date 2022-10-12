import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  st: {
    user: {
      data: {},
      bgg: {},
    },
    auth: {
      token: null,
      expires: 0,
    },
    mathtrade: null,
  },
};

export const storeData = createSlice({
  name: "storeData",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setStoreData: (state, action) => {
      state.st = action.payload;
    },
    setUserData: (state, action) => {
      state.st.user.data = action.payload;
    },
    setUserBGG: (state, action) => {
      state.st.user.bgg = action.payload;
    },
    setMathtrade: (state, action) => {
      state.st.mathtrade = action.payload;
    },
  },
});

export const { setStoreData, setUserData, setUserBGG, setMathtrade } =
  storeData.actions;

export const selectStoreData = (state) => state.storeData.st;

export default storeData.reducer;
