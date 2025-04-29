import * as dotenv from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { PrismaClient } from "../../generated/prisma";

dotenv.config();
// const prisma = new PrismaClient();

interface GenerateQuestionsParams {
   jobRequirements: string;
   experienceLevel: string;
   difficultyLevel: string;
}

interface Question {
   question: string;
   answer: string;
}

interface ParsedResponse {
   questions: Question[];
}

export class QuestionGeneratorService {
   private model: ChatGoogleGenerativeAI;
   private prompt: ChatPromptTemplate;
   private chain: RunnableSequence;

   constructor() {
      this.model = new ChatGoogleGenerativeAI({
         model: "gemini-2.0-flash",
         apiKey: process.env.GEMINI_API_KEY,
      });

      this.prompt = ChatPromptTemplate.fromMessages([
         [
            "system",
            "You are a senior software engineer with skills in web development, mobile development, and cloud computing",
         ],
         [
            "human",
            "Ask a list of questions to the candidate also list the evaluation criteria for each generated question for this job description:\n{description} for a candidate who is {years} years experienced and keep the interview difficulty in {difficulty}",
         ],
      ]);

      this.chain = RunnableSequence.from([
         this.prompt,
         this.model,
         new StringOutputParser(),
      ]);
   }

   private parseAIResponse(response: string): ParsedResponse {
      try {
         // Split the response into lines and process each question
         const lines = response.split("\n");
         const questions: Question[] = [];
         let currentQuestion: Partial<Question> = {};

         for (const line of lines) {
            if (line.startsWith("Q:") || line.startsWith("Question:")) {
               if (currentQuestion.question) {
                  questions.push(currentQuestion as Question);
               }
               currentQuestion = {
                  question: line.replace(/^(Q:|Question:)\s*/, "").trim(),
               };
            } else if (line.startsWith("A:") || line.startsWith("Answer:")) {
               currentQuestion.answer = line
                  .replace(/^(A:|Answer:)\s*/, "")
                  .trim();
            }
         }

         // Add the last question if exists
         if (currentQuestion.question && currentQuestion.answer) {
            questions.push(currentQuestion as Question);
         }

         return { questions };
      } catch (error) {
         console.error("Error parsing AI response:", error);
         throw new Error("Failed to parse AI response");
      }
   }

   async generateQuestions(params: GenerateQuestionsParams) {
      try {
         const result = await this.chain.invoke({
            description: params.jobRequirements,
            years: params.experienceLevel,
            difficulty: params.difficultyLevel,
         });

         const parsedResponse = this.parseAIResponse(result);
         return parsedResponse;
      } catch (error) {
         console.error("Error generating questions:", error);
         throw error;
      }
   }
}
