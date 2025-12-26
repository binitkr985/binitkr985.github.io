import Project from "../models/Project.model.js";
import { renderMarkdownToHTML } from "../services/markdown.service.js";

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ published: true })
      .select(
        "title slug shortDescription techStack images liveUrl githubUrl"
      )
      .sort({ updatedAt: -1 });

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const html = await renderMarkdownToHTML(
      project.descriptionMarkdown
    );

    res.json({
      title: project.title,
      slug: project.slug,
      html,
      techStack: project.techStack,
      images: project.images,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};
