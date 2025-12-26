import AIChunk from "../models/AIChunk.model.js";
import { markdownToPlainText } from "./markdownText.service.js";
import { chunkText } from "./chunk.service.js";
import { generateEmbedding } from "./embedding.service.js";

export const indexMarkdownContent = async ({
  sourceType,
  sourceId,
  markdown,
}) => {
  // Remove old chunks
  await AIChunk.deleteMany({ sourceType, sourceId });

  const plainText = await markdownToPlainText(markdown);
  const chunks = chunkText(plainText);

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk);

    await AIChunk.create({
      sourceType,
      sourceId,
      content: chunk,
      embedding,
    });
  }
};
