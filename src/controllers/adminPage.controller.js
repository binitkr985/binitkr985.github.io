import Page from "../models/Page.model.js";
import { indexMarkdownContent } from "../services/aiIndex.service.js";
import AIChunk from "../models/AIChunk.model.js";

export const createPage = async (req, res, next) => {
  try {
    const page = await Page.create(req.body);

    if (page.aiAccessible && page.published) {
      await indexMarkdownContent({
        sourceType: "page",
        sourceId: page._id,
        markdown: page.markdown,
      });
    }

    res.status(201).json(page);
  } catch (err) {
    next(err);
  }
};

export const updatePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    await AIChunk.deleteMany({
      sourceType: "page",
      sourceId: page._id,
    });

    if (page.aiAccessible && page.published) {
      await indexMarkdownContent({
        sourceType: "page",
        sourceId: page._id,
        markdown: page.markdown,
      });
    };

    res.json(page);
  } catch (err) {
    next(err);
  }
};

export const deletePage = async (req, res, next) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    
    await AIChunk.deleteMany({
      sourceType: "page",
      sourceId: page._id,
    });
    
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const listPages = async (req, res, next) => {
  try {
    const pages = await Page.find().sort({ updatedAt: -1 });
    res.json(pages);
  } catch (err) {
    next(err);
  }
};
