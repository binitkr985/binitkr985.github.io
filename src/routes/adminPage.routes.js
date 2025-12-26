import express from "express";
import {
  createPage,
  updatePage,
  deletePage,
  listPages,
} from "../controllers/adminPage.controller.js";

import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAdminAuth);

router.get("/", listPages);
router.post("/", createPage);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;
