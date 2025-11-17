import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducer/counter-reduer";
import userReducer from "./reducer/user-reducer";

export const store = configureStore({
  reducer: {
    counter,
    userReducer,
  },
});
