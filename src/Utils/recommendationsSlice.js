import { createSlice } from "@reduxjs/toolkit";

const recomendationsSlice = createSlice({
  name: "recomendations",
  initialState: {
    recomendations: [],
  },
  reducers: {
    addRecommendations: (state, action) => {
      state.recomendations = action.payload;
    },
    removeRecommendations: (state) => {
      state.recomendations = [];
    },
  },
});

export const { addRecommendations, removeRecommendations } =
  recomendationsSlice.actions;
export default recomendationsSlice.reducer;
