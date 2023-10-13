import express from "express";
import { uploadResume, getResume, rateResume } from "../controllers/resume.js";
import { upload } from "../middleware.js";

const router = express.Router();

router.post("/users/:user_id/upload", upload.single("pdfFile"), uploadResume);
router.get("/users/:user_id", getResume)
router.post("/rate", rateResume);

export default router;