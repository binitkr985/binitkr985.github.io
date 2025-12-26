import Project from "../models/Project.model.js";
import { indexMarkdownContent } from "../services/aiIndex.service.js";
import AIChunk from "../models/AIChunk.model.js";

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    if (project.aiAccessible && project.published) {
      await indexMarkdownContent({
        sourceType: "project",
        sourceId: project._id,
        markdown: project.markdown,
      });
    }
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    await AIChunk.deleteMany({
      sourceType: "project",
      sourceId: project._id,
    });

    if (project.aiAccessible && project.published) {
      await indexMarkdownContent({
        sourceType: "project",
        sourceId: project._id,
        markdown: project.markdown,
      });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    await AIChunk.deleteMany({
      sourceType: "project",
      sourceId: project._id,
    });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const listProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};
