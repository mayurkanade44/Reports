import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    reportName: { type: String, required: true },
    templateType: { type: String, required: true },
    reportType: { type: String, required: true },
    meetTo: { type: String, required: true },
    meetContact: { type: String },
    meetEmail: { type: String },
    shownTo: { type: String, required: true },
    shownContact: { type: String },
    shownEmail: { type: String },
    inspectionBy: { type: String, required: true },
    inspectionDate: { type: String, required: true },
    details: [],
    link: { type: String },
    approved: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
