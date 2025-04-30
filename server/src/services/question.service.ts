import { PrismaClient } from "../../generated/prisma";
import { QuestionGeneratorService } from "./questionGenerator.service";

const prisma = new PrismaClient();
export const generateNewQuestions = async (interviewId: string) => {
   if (!interviewId) throw new Error("Interview ID is required");
   try {
      const interview = await prisma.interview.findUnique({
         where: {
            id: interviewId,
         },
      });

      if (!interview) throw new Error("Interview not found");
      const questionGenerator = new QuestionGeneratorService();
      const questions = await questionGenerator.generateQuestions({
         jobRequirements: interview.jobRequirements,
         experienceLevel: interview.experienceLevel,
         difficultyLevel: interview.difficultyLevel,
      });
      
      return questions;
   } catch (error) {
      throw error;
   }
};

export const saveQuestionsInInterview = async (interviewId: string, questions: string) => {
   try {
      if(!interviewId) throw new Error("Interview ID is required");
      if(!questions) throw new Error("Questions are required");
      const savedQuestions = await prisma.questions.create({
         data: {
            interviewId,
            questions,
         },
      })

      if(!savedQuestions) throw new Error("Questions not saved");
      return savedQuestions;
   } catch (error) {
      throw error;  
   }
}

export const getAllQuestions = async (interviewId: string) => {
   try {
      if(!interviewId) throw new Error("Interview ID is required");
      const questionsData = await prisma.questions.findMany({
         where: {
            interviewId,
         },
      });
      
      if(!questionsData) throw new Error("Questions not found");
      
      // Parse the questions string into an array of questions
      const parsedQuestions = questionsData.map(questionData => {
         try {
            return JSON.parse(questionData.questions);
         } catch (e) {
            return questionData.questions; // Return raw string if parsing fails
         }
      });

      return parsedQuestions;
   } catch (error) {
      throw error;
   }
}