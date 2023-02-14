import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { authFetch } from "./auth";

const initialState = {
  reportLoading: false,
  contract: null,
  reportName: "",
  templateType: "",
  reportType: "",
  meetTo: "",
  meetContact: "",
  meetEmail: "",
  shownTo: "",
  shownContact: "",
  shownEmail: "",
  inspectionDate: "",
  image1: null,
  image2: null,
  details: [],
  reports: [],
  search: "",
  approved: 0,
  emailSent: 0,
  directReport: false,
};

export const createReport = createAsyncThunk(
  "report/create",
  async (form, thunkAPI) => {
    try {
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

export const editReport = createAsyncThunk(
  "report/edit",
  async ({ id, form }, thunkAPI) => {
    try {
      const res = await authFetch.patch(`/report/editReport/${id}`, form);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const allReports = createAsyncThunk(
  "report/all",
  async (search, thunkAPI) => {
    try {
      let url = "/report/allReports";
      if (search) url += `?search=${search}`;
      const res = await authFetch.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const verifyReport = createAsyncThunk(
  "report/verify",
  async (id, thunkAPI) => {
    try {
      const res = await authFetch.patch(`/report/verifyReport/${id}`);
      thunkAPI.dispatch(allReports(thunkAPI.getState().report.search));
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const contractDetails = createAsyncThunk(
  "report/contractDetails",
  async (search, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_CQR}/api/contractDetails?search=${search}`
      );
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
    directUpload: (state) => {
      state.directReport = true;
      state.templateType = "Direct";
      state.reportType = "Direct";
      state.meetTo = "Direct";
      state.shownTo = "Direct";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReport.pending, (state) => {
        state.reportLoading = true;
      })
      .addCase(createReport.fulfilled, (state, { payload }) => {
        state.reportLoading = false;
        toast.success(payload.msg, { autoClose: 1000 });
        state.details = [];
      })
      .addCase(createReport.rejected, (state, { payload }) => {
        state.reportLoading = false;
        console.log(payload);
      })
      .addCase(uploadImage.pending, (state) => {
        state.reportLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
        state.reportLoading = false;
        if (payload.imageCount === "image1") state.image1 = payload.link;
        else if (payload.imageCount === "image2") state.image2 = payload.link;
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.reportLoading = false;
        console.log(payload);
      })
      .addCase(allReports.pending, (state) => {
        state.reportLoading = true;
      })
      .addCase(allReports.fulfilled, (state, { payload }) => {
        state.reportLoading = false;
        state.reports = payload.reports;
        state.approved = payload.approved;
        state.emailSent = payload.email;
      })
      .addCase(allReports.rejected, (state, { payload }) => {
        state.reportLoading = false;
        console.log(payload);
      })
      .addCase(verifyReport.pending, (state) => {
        state.reportLoading = true;
      })
      .addCase(verifyReport.fulfilled, (state, { payload }) => {
        state.reportLoading = false;
        toast.success(payload.msg);
      })
      .addCase(verifyReport.rejected, (state, { payload }) => {
        state.reportLoading = false;
        console.log(payload);
      })
      .addCase(contractDetails.pending, (state) => {
        state.reportLoading = true;
        state.contract = null;
      })
      .addCase(contractDetails.fulfilled, (state, { payload }) => {
        state.reportLoading = false;
        state.contract = payload.details;
      })
      .addCase(contractDetails.rejected, (state, { payload }) => {
        state.reportLoading = false;
        toast.error(payload);
      })
      .addCase(editReport.pending, (state) => {
        state.reportLoading = true;
      })
      .addCase(editReport.fulfilled, (state, { payload }) => {
        state.reportLoading = false;
        toast.success(payload.msg);
      })
      .addCase(editReport.rejected, (state, { payload }) => {
        state.reportLoading = false;
        toast.error(payload);
      });
  },
});

export const { addPage, reportHandleChange, directUpload } =
  reportSlice.actions;

export default reportSlice.reducer;
