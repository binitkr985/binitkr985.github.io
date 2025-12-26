import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  listBlogs,
} from "../controllers/adminBlog.controller.js";

import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAdminAuth);

router.get("/", listBlogs);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
