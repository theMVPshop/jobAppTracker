import express from "express";
import { scrape } from "../controllers/scrape.js";

const router = express.Router();

router.post("/", scrape);

export default router;