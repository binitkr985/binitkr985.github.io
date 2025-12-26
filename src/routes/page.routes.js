import express from "express";
import { getPageBySlug } from "../controllers/page.controller.js";

const router = express.Router();

router.get("/:slug", getPageBySlug);

export default router;
