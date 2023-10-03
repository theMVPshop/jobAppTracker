import express from "express";
import { processResume, getEvent } from "../controllers/resume.js";
import { upload } from "../middleware.js";

const router = express.Router();

router.post("/upload", upload.single("pdfFile"), processResume);

router.get("/events/:fileId", getEvent);

export default router;