import express from "express";
import { processResume } from "../controllers/resume.js";
import { upload } from "../middleware.js";

const router = express.Router();

router.post("/upload", upload.single("pdfFile"), processResume);

export default router;