import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesSlice from "./moviesSlice";
import eventHandlingSlice from "./eventHandlingSlice";
import recommendationsSlice from "./recommendationsSlice";
import movieDetailsSlice from "./movieDetailsSlice";
import favouriteSlice from "./favouriteSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

// Combine all the reducers into a root reducer
const rootReducer = combineReducers({
  user: userSlice,
  movies: moviesSlice,
  eventHandling: eventHandlingSlice,
  recommendations: recommendationsSlice,
  movieDetails: movieDetailsSlice,
  favourites: favouriteSlice, // the favourites slice will be persisted
});

// Persist the root reducer
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['favourites'], // only 'favourites' will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and thunk middleware
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const persistor = persistStore(appStore);
export default appStore;
