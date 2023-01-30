import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  reportName: { type: String, required: true },
  templateName: { type: String, required: true },
  type: { type: String, required: true },
  details: [],
  link: { type: String },
});

export default mongoose.model("Report", ReportSchema);
