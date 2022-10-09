import { createSlice } from "@reduxjs/toolkit";

// STATE
const initialState = {
  mobile: false,
  addPostIsOpen: false,
  addStoryIsOpen: false,
  posts: [],
  selectedProfile: {},
  storyUid: null,
  stories: [],
  storyIndex: null,
};

// MUTATIONS
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SetScreen: (state, action) => {
      state.mobile = action.payload.mobile;
    },
    setAddPostModal: (state, action) => {
      state.addPostIsOpen = action.payload.addPostIsOpen;
    },
    SetAddStoryModal: (state, action) => {
      state.addStoryIsOpen = action.payload.addStoryIsOpen;
    },
    SetPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    SetStories: (state, action) => {
      state.stories = action.payload.stories;
    },
    SetSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload.selectedProfile;
    },
    SetStoryUid: (state, action) => {
      state.storyUid = action.payload.storyUid;
    },
    SetStoryIndex: (state, action) => {
      state.storyIndex = action.payload.storyIndex;
    },
  },
});

// ACTIONS
export const {
  SetScreen,
  setAddPostModal,
  SetAddStoryModal,
  SetPosts,
  SetStories,
  SetSelectedProfile,
  SetStoryUid,
  SetStoryIndex,
} = appSlice.actions;

// GETTERS
export const selectMobile = (state) => state.app.mobile;
export const selectAddPostIsOpen = (state) => state.app.addPostIsOpen;
export const selectAddStoryIsOpen = (state) => state.app.addStoryIsOpen;
export const selectPosts = (state) => state.app.posts;
export const selectStories = (state) => state.app.stories;
export const SelectProfile = (state) => state.app.selectedProfile;
export const selectStoryUid = (state) => state.app.storyUid;
export const selectStoryIndex = (state) => state.app.storyIndex;

// MAIN
export default appSlice.reducer;
