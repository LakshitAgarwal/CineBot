import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("favourites");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading favourites from localStorage:", error);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem("favourites", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving favourites to localStorage:", error);
  }
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: loadFromLocalStorage(),
  },
  reducers: {
    addfav: (state, action) => {
      // Check if the movie is already in favourites to prevent duplicates
      const isAlreadyFavorite = state.favourites.some(
        (movie) => movie.id === action.payload.id
      );

      if (!isAlreadyFavorite) {
        state.favourites.push(action.payload);
        saveToLocalStorage(state.favourites);
      }
    },
    removeFav: (state, action) => {
      state.favourites = state.favourites.filter(
        (movie) => movie.id !== action.payload
      );
      saveToLocalStorage(state.favourites);
    },
  },
});

export const { addfav, removeFav } = favouriteSlice.actions;
export default favouriteSlice.reducer;
