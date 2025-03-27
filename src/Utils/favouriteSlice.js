import { createSlice } from "@reduxjs/toolkit";

// Load favorites from localStorage
const loadFavoritesFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("favourites");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("Could not load favorites from storage", e);
    return [];
  }
};

// Save favorites to localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem("favourites", JSON.stringify(favorites));
  } catch (e) {
    console.error("Could not save favorites to storage", e);
  }
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: loadFavoritesFromStorage(),
  },
  reducers: {
    addfav: (state, action) => {
      state.favourites.push(action.payload);
      saveFavoritesToStorage(state.favourites);
    },
    removeFav: (state, action) => {
      state.favourites = state.favourites.filter(
        (movie) => movie.id !== action.payload
      );
      saveFavoritesToStorage(state.favourites);
    },
  },
});

export const { addfav, removeFav } = favouriteSlice.actions;
export default favouriteSlice.reducer;
