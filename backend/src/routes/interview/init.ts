import { Router } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/request-validator";
import { Request, Response } from "express";
import { Candidate } from "../../models/candidate/candidate";
import { initInterviewValidation } from "../../validations/interview/init";
import {
  Interview,
  InterviewStatusEnum,
} from "../../models/interview/interview";
import { ObjectId } from "../../types/mongoose";
import { buildPrompt } from "../../helpers/ai/build-prompt";
import { callAI, parseAIResponse } from "../../helpers/ai/ai";

const route = Router();

route.get(
  "/init",
  validateRequest(undefined, initInterviewValidation, undefined),
  async (req: Request, res: Response) => {
    try {
      const candidate = await Candidate.findById(req.query.candidateId);
      const difficultyLevel = req.query.difficultyLevel || "easy";
      if (!candidate) {
        throw new BadRequestError("Candidate not found.");
      }
      let interview = await Interview.findOne({
        candidateId: new ObjectId(req.query.candidateId as string),
      });
      if (!interview)
        interview = await Interview.create({
          candidateId: new ObjectId(req.query.candidateId as string),
        });

      if (interview && interview.status === InterviewStatusEnum.Finished) {
        res.status(200).json({
          message: "Success",
          data: {
            interview,
            candidate,
            difficultyLevel,
          },
        });
        return;
      }
      // const prompt = buildPrompt({
      //   jobDescription: candidate.jobDescription as string,
      //   experienceYears: candidate.exprerienceYears as number,
      //   experienceMonths: candidate.experienceMonths as number,
      //   difficulty: difficultyLevel as string,
      // });

      // const rawOutput = await callAI(prompt);

      // const questionsAndAnswers = parseAIResponse(rawOutput);
      //  console.log({ questionsAndAnswers });
      const data = {
        interview,
        candidate,
        //  questionsAndAnswers: questionsAndAnswers,
        questionsAndAnswers: [
          {
            question:
              "Explain the difference between synchronous and asynchronous programming in JavaScript. Provide an example of how you would handle an asynchronous operation.",
            answer:
              "Synchronous programming executes code line by line, blocking further execution until the current operation completes. Asynchronous programming allows non-blocking execution by using callbacks, promises, or async/await. For example, to handle an asynchronous API call, we can use async/await: `const fetchData = async () => { try { const response = await fetch('https://api.example.com/data'); const data = await response.json(); console.log(data); } catch (error) { console.error(error); } };`",
            maxMarks: 10,
          },
          {
            question:
              "Describe the differences between SQL and NoSQL databases. When would you choose MongoDB over MySQL?",
            answer:
              "SQL databases like MySQL use structured schemas and are best for applications requiring complex queries and transactions. NoSQL databases like MongoDB are schema-less and excel in handling unstructured or semi-structured data, offering flexibility and scalability. MongoDB is preferable when dealing with large volumes of unstructured data or when the data model is expected to evolve over time, such as in real-time analytics or content management systems.",
            maxMarks: 10,
          },
          {
            question:
              "How would you optimize the performance of a Node.js web application?",
            answer:
              "To optimize a Node.js application, you can: 1) Use clustering or worker threads to take advantage of multi-core CPUs. 2) Implement caching mechanisms such as Redis. 3) Optimize database queries to reduce latency. 4) Use asynchronous coding practices to avoid blocking the event loop. 5) Compress responses using middleware like `compression`. 6) Monitor and profile the application with tools like PM2 or New Relic to identify bottlenecks.",
            maxMarks: 10,
          },
          {
            question:
              "What is the purpose of a RESTful API, and how would you design one for a simple blog application?",
            answer:
              "A RESTful API allows communication between a client and server using HTTP methods. For a blog application, you could design endpoints like: `GET /posts` to retrieve all posts, `GET /posts/:id` to retrieve a single post, `POST /posts` to create a new post, `PUT /posts/:id` to update a post, and `DELETE /posts/:id` to delete a post. Each endpoint should return appropriate HTTP status codes and responses in JSON format.",
            maxMarks: 10,
          },
          {
            question:
              "How would you handle version control in a team setting to ensure smooth collaboration?",
            answer:
              "Using Git, you can ensure smooth collaboration by: 1) Creating feature branches for new work. 2) Regularly pulling changes from the main branch to stay updated. 3) Writing clear commit messages. 4) Using pull requests for code reviews before merging. 5) Resolving conflicts promptly. 6) Following a branching strategy like GitFlow to organize work. These practices reduce conflicts and improve code quality.",
            maxMarks: 10,
          },
        ],
        difficultyLevel,
      };

      res.status(200).json({ message: "Success", data });
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Cound not Initialize Interview.");
    }
  }
);
export { route as initInterviewRouter };
