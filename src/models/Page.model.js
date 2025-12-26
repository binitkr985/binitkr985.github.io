import mongoose from "mongoose";

const PageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    markdown: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    aiAccessible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Page", PageSchema);
