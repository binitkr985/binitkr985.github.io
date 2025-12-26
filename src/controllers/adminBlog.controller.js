import { indexMarkdownContent } from "../services/aiIndex.service.js";
import Blog from "../models/Blog.model.js";
import AIChunk from "../models/AIChunk.model.js";

export const createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);

        if (blog.aiAccessible && blog.published) {
            await indexMarkdownContent({
                sourceType: "blog",
                sourceId: blog._id,
                markdown: blog.markdown,
            });
        }

        res.status(201).json(blog);
    } catch (err) {
        next(err);
    }
};

export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        await AIChunk.deleteMany({
            sourceType: "blog",
            sourceId: blog._id,
        });

        if (blog.aiAccessible && blog.published) {
            await indexMarkdownContent({
                sourceType: "blog",
                sourceId: blog._id,
                markdown: blog.markdown,
            });
        }

        return res.json(blog);
    } catch (err) {
        next(err);
    }
};


export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        await AIChunk.deleteMany({
            sourceType: "blog",
            sourceId: blog._id,
        });

        return res.json({ success: true });
    } catch (err) {
        next(err);
    }
};


export const listBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ published: true })
            .sort({ updatedAt: -1 });
        res.json(blogs);
    } catch (err) {
        next(err);
    }
};
