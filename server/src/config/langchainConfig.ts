import { ChatOpenAI } from "@langchain/openai";
import {
  START,
  END,
  Annotation,
  StateGraph,
  MemorySaver,
  messagesStateReducer,
} from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";
import fs from "fs";
import path from "path";
import { extractProfile } from "./ExtractProfile";

export const graphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  profile: Annotation<object>(),
});

// Read the default system prompt from the file
export const loadSystemPrompt = (): string => {
  try {
    // Adjust the path to your data directory relative to where the script runs
    const promptPath = path.join(process.cwd(), "data", "SystemPrompt.txt");
    console.log("Loading system prompt from:", promptPath);
    return fs.readFileSync(promptPath, "utf-8").trim();
  } catch (error) {
    console.warn("Failed to load system prompt from file:", error);
    // Fallback to a default prompt if file reading fails
    return "You are a helpful AI assistant.";
  }
};

// Default system prompt
export const DEFAULT_SYSTEM_PROMPT = loadSystemPrompt();

// Initialize LangChain components
export const llm = new ChatOpenAI({
  model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
  temperature: 0,
});

// Define the function that calls the model
export const callModel = async (state: typeof graphState.State) => {
  const response = await llm.invoke(state.messages);
  return { messages: [...state.messages, response] };
};

// Create and export LangGraph workflow
export const createWorkflow = () => {
  const workflow = new StateGraph(graphState)
    .addNode("model", callModel)
    .addNode("profileExtractor", extractProfile)
    .addEdge(START, "model")
    .addEdge("model", "profileExtractor")
    .addEdge("profileExtractor", END);

  const memory = new MemorySaver();
  return workflow.compile({ checkpointer: memory });
};
