import Page from "../models/Page.model.js";
import { renderMarkdownToHTML } from "../services/markdown.service.js";

export const getPageBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const page = await Page.findOne({ slug, published: true });
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    const html = await renderMarkdownToHTML(page.markdown);

    res.json({
      title: page.title,
      slug: page.slug,
      html,
      updatedAt: page.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};
