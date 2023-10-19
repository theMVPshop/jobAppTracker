import express from "express";
import cors from "cors";
import 'dotenv/config';
import path from "path";
import url from "url";
import OpenAI from "openai";
import resumeRouter from "./server/routes/resume.js";
import scrapeRouter from "./server/routes/scrape.js";
import applicationsRouter from "./server/routes/applications.js";
import passUuidRouter from "./server/routes/passUuid.js"

export const openai = new OpenAI();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRouter);
app.use("/api/scrape", scrapeRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/uuid", passUuidRouter);

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, './client/dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});