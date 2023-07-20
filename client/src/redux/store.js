import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadersSlice";
import userReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    loaders: loadingReducer,
    user: userReducer,
  },
});
