import express from "express";
const router = express.Router();

import {
  allReports,
  createReport,
  editReport,
  sendEmail,
  uploadImages,
} from "../controllers/ReportController.js";

router.route("/create").post(createReport);
router.route("/uploadImage").post(uploadImages);
router.route("/allReports").get(allReports);
router.route("/sendEmail").post(sendEmail);
router.route("/editReport/:id").patch(editReport);

export default router;
