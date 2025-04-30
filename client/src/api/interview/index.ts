import { API_ENDPOINTS } from "@/lib/apiConstants";
import api from "..";

interface Iinterview {
   jobRequirements: string;
   experienceLevel: string;
   difficultyLevel: string;
}

export const createInterview = async (interviewBody: Iinterview) => {
   const interview = await api.post(
      API_ENDPOINTS.INTERVIEW.CREATE,
      interviewBody
   );
   return interview;
};
