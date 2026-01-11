import Page from "../models/Page.model.js";

export const createPage = async (req, res, next) => {
  try {
    const page = await Page.create(req.body);

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
