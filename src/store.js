import { configureStore, createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    username: "",
    vocaLevel: "",
    views: 0,
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setVocalevel(state, action) {
      state.vocaLevel = action.payload;
    },
    setViews(state, action) {
      state.views = action.payload;
    },
  },
});

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

const headerIsVisible = createSlice({
  name: "headerIsVisible",
  initialState: {
    visible: true,
  },
  reducers: {
    toggleHeaderVisible(state, action) {
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
export let { toggleHeaderVisible } = headerIsVisible.actions;
export let { toggleFooterVisible } = footerIsVisible.actions;
export let { setUsername, setViews, setVocalevel } = userInfo.actions;

export default configureStore({
  reducer: {
    levelTestProgressCounter: levelTestProgressCounter.reducer,
    headerIsVisible: headerIsVisible.reducer,
    footerIsVisible: footerIsVisible.reducer,
    userInfo: userInfo.reducer,
  },
});
