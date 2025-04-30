import { API_ENDPOINTS } from "@/lib/apiConstants";
import api from "..";

export const generateNewQuestions = async (interviewId: string, genType: string) => {
   const response = await api.get(
      `${API_ENDPOINTS.QUESTION.GENERATE}/${interviewId}/${genType}`
   );

   if (response.status !== 200) {
      throw new Error("Failed to generate questions");
   }
   return response;
};
