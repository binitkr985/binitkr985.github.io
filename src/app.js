import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import pageRoutes from "./routes/page.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import healthRoutes from "./routes/health.routes.js";
import projectRoutes from "./routes/project.routes.js";
import adminPageRoutes from "./routes/adminPage.routes.js";
import adminBlogRoutes from "./routes/adminBlog.routes.js";
import adminProjectRoutes from "./routes/adminProject.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin/pages", adminPageRoutes);
app.use("/api/admin/blogs", adminBlogRoutes);
app.use("/api/admin/projects", adminProjectRoutes);

app.use(errorHandler);

export default app;