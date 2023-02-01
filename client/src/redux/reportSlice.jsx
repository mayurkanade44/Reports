import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  reportName: "RIM test 4",
  templateType: "",
  reportType: "",
  meetTo: "",
  inspectionDate: "",
  inspectionBy: "Mallu Yadav",
  images: [],
  details: [],
};

export const createReport = createAsyncThunk(
  "report/create",
  async (_, thunkAPI) => {
    try {
      const {
        reportName,
        templateType,
        reportType,
        meetTo,
        inspectionBy,
        inspectionDate,
        details,
      } = thunkAPI.getState().report;
      const form = {
        reportName,
        templateType,
        reportType,
        meetTo,
        inspectionBy,
        inspectionDate,
        details
      }
      const res = await axios.post("/report/create", form);
      return res.data;
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
      const res = await axios.post("/report/uploadImage", form);
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
  reducers: {
    addPage: (state, { payload: { formValue } }) => {
      state.details.push(formValue);
      state.images = [];
    },
    reportHandleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
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

export const { addPage, reportHandleChange } = reportSlice.actions;

export default reportSlice.reducer;
