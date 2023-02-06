import express from "express";
const router = express.Router();

import { createReport, uploadImages } from "../controllers/ReportController.js";

router.route("/create").post(createReport);
router.route("/uploadImage").post(uploadImages);

export default router;
