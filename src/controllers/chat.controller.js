import { generateEmbedding } from "../services/embedding.service.js";
import { findRelevantChunks } from "../services/vectorSearch.service.js";
import {
  buildSystemPrompt,
  buildUserPrompt,
} from "../services/prompt.service.js";
import { generateChatResponse } from "../services/chatCompletion.service.js";

export const chatWithPortfolio = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question || question.length < 3) {
      return res
        .status(400)
        .json({ message: "Invalid question" });
    }

    const queryEmbedding = await generateEmbedding(
      question
    );

    const chunks = await findRelevantChunks(
      queryEmbedding
    );

    if (!chunks.length) {
      return res.json({
        answer:
          "This information is not available in my portfolio.",
      });
    }

    const context = chunks
      .map((c) => `- ${c.content}`)
      .join("\n");

    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(
      question,
      context
    );

    const answer = await generateChatResponse({
      systemPrompt,
      userPrompt,
    });

    res.json({ answer });
  } catch (err) {
    next(err);
  }
};
