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
import opeanAIRouter from "./server/routes/openaiJobTrack.js"

const apiKey = process.env.OPENAI_API_KEY

export const openai = new OpenAI({
  apiKey: apiKey, // Your OpenAI API key
});


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categorize", opeanAIRouter)
app.use("/api/resume", resumeRouter);
app.use("/api/scrape", scrapeRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/uuid", passUuidRouter);

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, './client/dist')));

app.get('*', function (_req, res) {
  res.sendFile(path.join(__dirname, './client/dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});