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
  },
});

export const { addRecommendations } = recomendationsSlice.actions;
export default recomendationsSlice.reducer;
