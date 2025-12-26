import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import healthRoutes from "./routes/health.routes.js";
import projectRoutes from "./routes/project.routes.js";
import authRoutes from "./routes/auth.routes.js";
import pageRoutes from "./routes/page.routes.js";
import adminPageRoutes from "./routes/adminPage.routes.js";
// import seedRoutes from "./routes/seed.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import adminBlogRoutes from "./routes/adminBlog.routes.js";
import adminProjectRoutes from "./routes/adminProject.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

/* Trust proxy */
app.set("trust proxy", 1);


/* Security */
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "1mb" }));

/* Rate limiting */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

/* Routes */
app.use("/api/health", healthRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/chat", chatRoutes);
// app.use("/api/seed", seedRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/pages", adminPageRoutes);
app.use("/api/admin/projects", adminProjectRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/admin/blogs", adminBlogRoutes);

/* Error handler */
app.use(errorHandler);

export default app;

// import Project from "./models/Project.model.js";
// (async () => {
// await Project.create({
//   title: "CallCon",
//   slug: "callcon",
//   shortDescription: "A Discord call-bridging bot",
//   descriptionMarkdown: "# CallCon\nA Discord bot that connects users...",
//   techStack: ["Node.js", "Discord.js", "MongoDB"],
//   images: ["https://via.placeholder.com/600"],
//   liveUrl: "https://callcon.me",
//   githubUrl: "https://github.com/yourrepo",
//   published: true,
//   aiAccessible: false
// });
// })();