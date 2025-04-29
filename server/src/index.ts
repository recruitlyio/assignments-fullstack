import express from "express";
import interviewRouter from "./routes/interview.route";
import questionRouter from "./routes/question.route";

const app = express();

app.use(express.json());
app.use("/api/v1/interview", interviewRouter);
app.use("/api/v1/question", questionRouter);

app.get("/", (req, res) => {
   res.send("Hello World!");
});

//global catch
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
   console.error(err.stack);
   res.status(500).send("Something broke!");
})

app.listen(8000, () => {
   console.log("Server is running on port 8000");
});
