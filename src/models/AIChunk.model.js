import mongoose from "mongoose";

const AIChunkSchema = new mongoose.Schema(
  {
    sourceType: {
      type: String,
      enum: ["page", "blog", "project"],
      required: true,
    },
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

AIChunkSchema.index({ embedding: "2dsphere" });

export default mongoose.model("AIChunk", AIChunkSchema);
