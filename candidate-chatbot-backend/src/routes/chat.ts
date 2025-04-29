import {chatFunction} from "../services/chat";
import {Router} from "express";

const router = Router();

// POST /chat
router.post('/', chatFunction);

export {router as chatRouter};