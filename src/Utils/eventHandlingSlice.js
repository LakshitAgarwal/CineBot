import { createSlice } from "@reduxjs/toolkit";

const eventHandlingSlice = createSlice({
  name: "eventHandling",
  initialState: { mouseclicked: false },
  reducers: {
    senseClick: (state, action) => {
      state.mouseclicked = !state.mouseclicked;
    },
  },
});

export default eventHandlingSlice.reducer;
export const { senseClick } = eventHandlingSlice.actions;
