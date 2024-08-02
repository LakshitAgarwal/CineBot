import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: { nowPlayingMovies: null },
  reducers: {
    addMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const { addMovies, addTrailer } = movieSlice.actions;
