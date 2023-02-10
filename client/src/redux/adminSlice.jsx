import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authFetch } from "./auth";

const initialState = {
  findings: [],
  suggestions: [],
};

export const getAdminValues = createAsyncThunk(
  "admin/getValues",
  async (_, thunkAPI) => {
    try {
      const res = await authFetch.get("/admin/values");
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminValues.pending, (state) => {
        state.reportLoading = true;
      })
      .addCase(getAdminValues.fulfilled, (state, { payload }) => {
        state.reportLoading = false;
        state.findings = payload.findings;
        state.suggestions = payload.suggestions;
      });
  },
});

export default adminSlice.reducer;
