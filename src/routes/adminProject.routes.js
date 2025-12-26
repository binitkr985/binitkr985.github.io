import express from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  listProjects,
} from "../controllers/adminProject.controller.js";

import { requireAdminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAdminAuth);

router.get("/", listProjects);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
