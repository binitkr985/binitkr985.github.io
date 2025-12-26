// import express from "express";
// import Page from "../models/Page.model.js";

// const router = express.Router();

// router.get("/page", async (req, res) => {
//   try {
//     const page = await Page.create({
//       slug: "about",
//       title: "About Me",
//       markdown: `
// # Hello, I am Vishal 👋

// I am a **Full Stack Developer** specializing in **Node.js**.

// ---

// ## Skills
// - JavaScript
// - Node.js
// - MongoDB
// - AI Systems

// ### Code Example
// \`\`\`js
// console.log("Hello World");
// \`\`\`

// ![Profile](https://via.placeholder.com/300)
// `,
//       published: true,
//       aiAccessible: false,
//     });

//     res.json({ success: true, page });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
