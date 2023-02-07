import { configureStore } from "@reduxjs/toolkit";
import reportSlice from "./reportSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    report: reportSlice,
    user: userSlice,
  },
});
