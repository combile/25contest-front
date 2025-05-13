import { configureStore, createSlice } from "@reduxjs/toolkit";

const levelTestProgressCounter = createSlice({
  name: "levelTestProgressCounter",
  initialState: {
    cnt: 0,
  },
  reducers: {
    addCnt(state) {
      state.cnt += 1;
    },
  },
});

export let { addCnt } = levelTestProgressCounter.actions;

export default configureStore({
  reducer: {
    levelTestProgressCounter: levelTestProgressCounter.reducer,
  },
});
