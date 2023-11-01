console.log("Hello!");

import express from "express";
import cors from "cors";
import path from "path";
import url from "url";
import OpenAI from "openai";
import resumeRouter from "./server/routes/resume.js";
import scrapeRouter from "./server/routes/scrape.js";
import applicationsRouter from "./server/routes/applications.js";
import passUuidRouter from "./server/routes/passUuid.js"
import opeanAIRouter from "./server/routes/openaiJobTrack.js"

export const openai = new OpenAI();

const app = express();

app.use(cors());
app.use(express.json());

console.log("Setting up routes...");

app.use("/api/categorize", opeanAIRouter)
app.use("/api/resume", resumeRouter);
app.use("/api/scrape", scrapeRouter);
app.use("/api/users", applicationsRouter);
app.use("/api/uuid", passUuidRouter);

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Setting up static files...");

app.use(express.static(path.join(__dirname, './client/dist')));

app.get('*', function (_req, res) {
  res.sendFile(path.join(__dirname, './client/dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

console.log("Starting server...");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});