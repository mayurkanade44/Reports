import express from "express";
const router = express.Router();

import {
  addPage,
  allReports,
  createReport,
  editReport,
  generateReport,
  newReport,
  sendEmail,
  testUpload,
  uploadImages,
} from "../controllers/ReportController.js";
import { authorizeUser } from "../middleware/auth.js";

router.route("/create").post(createReport);
router.route("/uploadImage").post(uploadImages);
router
  .route("/allReports")
  .get(authorizeUser("Admin", "Back Office"), allReports);
router
  .route("/sendEmail")
  .post(authorizeUser("Admin", "Back Office"), sendEmail);
router.route("/newReport/:id").post(newReport).patch(addPage);
router
  .route("/editReport/:id")
  .patch(authorizeUser("Admin", "Back Office"), editReport);
router.route("/generate/:id").get(generateReport);
router.route("/testUpload").post(testUpload);

export default router;
