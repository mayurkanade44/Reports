import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authFetch } from "./auth";

const initialState = {
  loading: false,
  reportName: "RIM",
  templateType: "",
  reportType: "",
  meetTo: "",
  meetContact: "",
  meetEmail: "",
  shownTo: "",
  shownContact: "",
  shownEmail: "",
  inspectionDate: "",
  inspectionBy: "",
  image1: null,
  image2: null,
  details: [],
  reports: [],
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
        meetContact,
        meetEmail,
        shownTo,
        shownContact,
        shownEmail,
        inspectionBy,
        inspectionDate,
        details,
      } = thunkAPI.getState().report;
      const form = {
        reportName,
        templateType,
        reportType,
        meetTo,
        meetContact,
        meetEmail,
        shownTo,
        shownContact,
        shownEmail,
        inspectionBy,
        inspectionDate,
        details,
      };
      const res = await authFetch.post("/report/create", form);
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
      const res = await authFetch.post("/report/uploadImage", form);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const allReports = createAsyncThunk(
  "report/all",
  async (_, thunkAPI) => {
    try {
      const res = await authFetch.get("/report/allReports");
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
      state.image1 = null;
      state.image2 = null;
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
        toast.success(payload.msg, { autoClose: 1000 });
        state.details = [];
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
        if (payload.imageCount === "image1") state.image1 = payload.link;
        else if (payload.imageCount === "image2") state.image2 = payload.link;
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })
      .addCase(allReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(allReports.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.reports = payload.reports;
      })
      .addCase(allReports.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      });
  },
});

export const { addPage, reportHandleChange } = reportSlice.actions;

export default reportSlice.reducer;
