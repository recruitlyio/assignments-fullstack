import {RequestHandler} from "express";
import {handleChat} from "./llm";

const chatFunction: RequestHandler = async (req, res) => {
  const {message, conversationId} = req.body;

  if (!message) {
    res.status(400).json({error: 'Message is required'});
    return
  }

  try {
    const response = await handleChat(message, conversationId);
    res.json(response);
  } catch (error) {
    console.error('Error in /chat:', error);
    res.status(500).json({error: 'Internal server error'});
  }
}


export {chatFunction};