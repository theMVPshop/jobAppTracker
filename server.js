import express from "express";
import cors from "cors";
import 'dotenv/config';
import OpenAI from "openai";
import resumeRouter from "./server/routes/resume.js";
import scrapeRouter from "./server/routes/scrape.js";

export const openai = new OpenAI();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRouter);
app.use("/api/scrape", scrapeRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});