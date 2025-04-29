import { JobRequest } from '../interfaces/api.types';
import { buildPrompt } from '../utils/promptBuilder';
import { generateFromLLM } from './llm.service';

export async function processJobRequest(data: JobRequest) {
    const prompt = buildPrompt(data);
    return await generateFromLLM(prompt);
  }
  