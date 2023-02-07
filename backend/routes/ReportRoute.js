import express from "express";
const router = express.Router();

import { allReports, createReport, uploadImages } from "../controllers/ReportController.js";

router.route("/create").post(createReport);
router.route("/uploadImage").post(uploadImages);
router.route("/allReports").get(allReports);

export default router;
