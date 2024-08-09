import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesSlice from "./moviesSlice";
import eventHandlingSlice from "./eventHandlingSlice";
import recommendationsSlice from "./recommendationsSlice";
import movieDetailsSlice from "./movieDetailsSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
    eventHandling: eventHandlingSlice,
    recommendations: recommendationsSlice,
    movieDetails: movieDetailsSlice,
  },
});

export default appStore;
