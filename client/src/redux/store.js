import { configureStore } from "@reduxjs/toolkit";
import reportSlice from "./reportSlice";

export const store = configureStore({
  reducer: {
    report: reportSlice,
  },
});
