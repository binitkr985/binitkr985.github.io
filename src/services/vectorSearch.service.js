import AIChunk from "../models/AIChunk.model.js";

const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
};

export const findRelevantChunks = async (
  queryEmbedding,
  limit = 5
) => {
  const chunks = await AIChunk.find();

  const scored = chunks.map((chunk) => ({
    ...chunk.toObject(),
    score: cosineSimilarity(
      queryEmbedding,
      chunk.embedding
    ),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
