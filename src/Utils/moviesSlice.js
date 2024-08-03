import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trailer: null,
    upcomingMovies: null,
    popularTVSeries: null,
    onAirSeries: null,
  },
  reducers: {
    addMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addPopularTVSeries: (state, action) => {
      state.popularTVSeries = action.payload;
    },
    addOnAirSeries: (state, action) => {
      state.onAirSeries = action.payload;
    },
  },
});

export default movieSlice.reducer;
export const {
  addMovies,
  addTrailer,
  addPopularMovies,
  addUpcomingMovies,
  addPopularTVSeries,
  addOnAirSeries,
} = movieSlice.actions;
