import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { PrismaClient } from "../../generated/prisma";

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

      this.prompt = ChatPromptTemplate.fromTemplate(
         `You are a senior software engineer with skills in web development, mobile development, and cloud computing.
       Ask a list of questions to the candidate and also list the evaluation criteria for each generated question for this job description:
       {description} for a candidate who is {years} years experienced and keep the interview difficulty in {difficulty}.`
      );

      this.chain = RunnableSequence.from([
         this.prompt,
         this.model,
         new StringOutputParser(),
      ]);
   }

   private parseAIResponse(response: string): ParsedResponse {
      const questions: Question[] = [];

      const questionRegex = /(?:\d+\.\s+)?\*\*Question:\*\*\s*"(.*?)"/g;
      const answerRegex =
         /\*\*Evaluation Criteria:\*\*([\s\S]*?)(?=\n\d+\.|\n\*\*Bonus|\n\*\*General|$)/g;

      const questionMatches = [...response.matchAll(questionRegex)];
      const answerMatches = [...response.matchAll(answerRegex)];

      // Combine matched questions and their evaluation criteria
      for (let i = 0; i < questionMatches.length; i++) {
         const question = questionMatches[i][1].trim();
         const answer =
            answerMatches[i]?.[1].trim() ?? "Evaluation criteria not found.";

         questions.push({ question, answer });
      }

      return { questions };
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
