import express from "express";
import { uploadResume, getResume, rateResume, getResumes, deleteResume } from "../controllers/resume.js";
import { upload } from "../middleware.js";

const router = express.Router();

router.get("/users/:user_id", getResume)
router.get('/users/:user_id/resumes', getResumes)
router.post("/users/:user_id/:file_name", upload.single("pdfFile"), uploadResume);
router.post("/rate", rateResume);
router.delete('/users/:user_id/delete', deleteResume)

export default router;