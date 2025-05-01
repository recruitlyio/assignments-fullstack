import express from "express";
import { processMessage } from "../services/chatService";

const router = express.Router();

router.post("/message", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log(
      "Processing message:",
      message.substring(0, 50) + (message.length > 50 ? "..." : "")
    );
    console.log(
      "Conversation history length:",
      conversationHistory?.length || 0
    );

    const response = await processMessage(message, conversationHistory || []);

    console.log("Response generated successfully");
    console.log(
      "Candidate info extracted:",
      response.candidateInfo ? "Yes" : "No"
    );

    res.json(response);
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

export { router as chatRouter };
