import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  images: [],
  details: [],
};

export const createReport = createAsyncThunk(
  "report/create",
  async (form, thunkAPI) => {
    try {
      console.log(form);
      //   const res = await axios.post("/report/create");
      //   return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "report/imgUpload",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/api/report/uploadImage", form);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload.msg);
      })
      .addCase(createReport.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.images = payload.imageLinks;
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      });
  },
});

export default reportSlice.reducer;
