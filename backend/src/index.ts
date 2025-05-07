import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, json } from "express";
import { errorHandler } from "./errors/error-handler";
import { getCorsOptions } from "./helpers/cors-options";
import { connectToMongodb } from "./helpers/connect-to-mongodb";
import { createCandidateRouter } from "./routes/candidate/create";
import { listCandidateRouter } from "./routes/candidate/list";
import { initInterviewRouter } from "./routes/interview/init";
import { saveInterviewRouter } from "./routes/interview/save-interview";
dotenv.config();

const app = express();
app.use(json());
app.use(cors(getCorsOptions()));

app.set("x-powered-by", false);

app.use(errorHandler as any);

app.use("/candidate", createCandidateRouter);
app.use("/candidate", listCandidateRouter);
app.use("/interview", initInterviewRouter);
app.use("/interview", saveInterviewRouter);

const server = app.listen(process.env.PORT || 5000, async () => {
  await connectToMongodb();
});

export { app, server };
