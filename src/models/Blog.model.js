import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
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
    excerpt: {
      type: String,
      maxlength: 300,
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
    },
    aiAccessible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
