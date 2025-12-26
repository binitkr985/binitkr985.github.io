import express from "express";
import { chatWithPortfolio } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", chatRateLimiter, chatWithPortfolio);

export default router;
