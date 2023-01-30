import express from "express";
const router = express.Router();

import { createReport } from "../controllers/reportController.js";

router.route("/create").post(createReport);

export default router;
