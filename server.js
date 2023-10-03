import express from "express";
import cors from "cors";
import resumeRouter from "./server/routes/resume.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

app.use("/api/resume", resumeRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});