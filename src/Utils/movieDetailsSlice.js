import { createSlice } from "@reduxjs/toolkit";

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    movieDetails: [],
  },
  reducers: {
    addMoviDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    removeMovieDetails: (state, action) => {
      state.movieDetails = [];
    },
  },
});

export const { addMoviDetails, removeMovieDetails } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
