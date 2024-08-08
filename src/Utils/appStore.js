import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesSlice from "./moviesSlice";
import eventHandlingSlice from "./eventHandlingSlice";
import recommendationsSlice from "./recommendationsSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
    eventHandling: eventHandlingSlice,
    recommendations: recommendationsSlice,
  },
});

export default appStore;
