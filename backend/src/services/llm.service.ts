import OpenAI from 'openai';
import { config } from '../config';
import { LLMresponse } from '../interfaces/llm.types';

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export async function generateFromLLM(prompt: string): Promise<LLMresponse[]> {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 1500,
  });

  const content = res.choices[0].message?.content;
  if (!content) throw new Error('Empty response from LLM');

  try {
    return JSON.parse(content) as LLMresponse[];
  } catch (e) {
    throw new Error(`Failed to parse LLM output: ${(e as Error).message}`);
  }
}