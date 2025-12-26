import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      maxlength: 200,
    },
    descriptionMarkdown: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    liveUrl: String,
    githubUrl: String,
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

export default mongoose.model("Project", ProjectSchema);
