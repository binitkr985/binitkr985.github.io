import express from "express";
import { chatWithPortfolio } from "../controllers/chat.controller.js";
import { chatRateLimiter } from "../middleware/chatRateLimit.middleware.js";

const router = express.Router();

router.post("/", chatRateLimiter, chatWithPortfolio);

export default router;
