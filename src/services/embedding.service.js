import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const embeddingModel = genAI.getGenerativeModel({
  model: "text-embedding-004",
});

export const generateEmbedding = async (text) => {
  if (!text || typeof text !== "string") {
    throw new Error("Text must be a non-empty string");
  }

  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Gemini embedding error:", error);
    throw new Error("Failed to generate embedding");
  }
};
