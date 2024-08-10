import { createSlice } from "@reduxjs/toolkit";
const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addfav: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFav: (state, action) => {
      state.favourites = state.favourites.filter(
        (_, index) => index !== action.payload
        // action.payload contains the data passed when the action is dispatched. In this case, it will be the index of the movie to remove. That's why we are checking with it.
      );
    },
  },
});

export const { addfav, removeFav } = favouriteSlice.actions;
export default favouriteSlice.reducer;
