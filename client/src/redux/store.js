import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice";

export const store = configureStore({
  reducer: {
    loaders: loadersSlice.reducer,
  },
});
