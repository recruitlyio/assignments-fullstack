import axios from "axios";
import { QuestionInput } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const generateQuestion = async (input: QuestionInput) => {
  const response = await axios.post(`${API_BASE}/generate`, input);
  return response.data;
};
