import express from "express";
const router = express.Router();

import {
  allReports,
  createReport,
  editReport,
  uploadImages,
  verifyReport,
} from "../controllers/ReportController.js";

router.route("/create").post(createReport);
router.route("/uploadImage").post(uploadImages);
router.route("/allReports").get(allReports);
router.route("/verifyReport/:id").patch(verifyReport);
router.route("/editReport/:id").patch(editReport);

export default router;
