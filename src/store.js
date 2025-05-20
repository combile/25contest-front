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
    initializeCnt(state) {
      state.cnt = 0;
    },
  },
});

const navIsVisible = createSlice({
  name: "navIsVisible",
  initialState: {
    visible: true,
  },
  reducers: {
    toggleNavVisible(state, action) {
      state.visible = action.payload;
    },
  },
});

const footerIsVisible = createSlice({
  name: "footerIsVisible",
  initialState: {
    visible: true,
  },
  reducers: {
    toggleFooterVisible(state, action) {
      state.visible = action.payload;
    },
  },
});

export let { addCnt, initializeCnt } = levelTestProgressCounter.actions;
export let { toggleNavVisible } = navIsVisible.actions;
export let { toggleFooterVisible } = footerIsVisible.actions;

export default configureStore({
  reducer: {
    levelTestProgressCounter: levelTestProgressCounter.reducer,
    navIsVisible: navIsVisible.reducer,
    footerIsVisible: footerIsVisible.reducer,
  },
});
