import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadersSlice";

export const store = configureStore({
  reducer: {
    loaders: loadingReducer,
  },
});
