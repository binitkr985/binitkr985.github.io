import Blog from "../models/Blog.model.js";
import { renderMarkdownToHTML } from "../services/markdown.service.js";

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true })
      .select("title slug excerpt tags createdAt")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const html = await renderMarkdownToHTML(blog.markdown);

    res.json({
      title: blog.title,
      slug: blog.slug,
      html,
      tags: blog.tags,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};
