import express from "express";
import { processResume, rateResume } from "../controllers/resume.js";
import { upload } from "../middleware.js";

const router = express.Router();

router.post("/upload", upload.single("pdfFile"), processResume);
router.post("/rate", rateResume);

export default router;