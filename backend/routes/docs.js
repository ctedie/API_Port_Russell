const express = require("express");
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const router = express.Router();

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "..", "docs.md");

  const markdownContent = fs.readFileSync(filePath, "utf-8");

  const htmlContent = marked.parse(markdownContent);

  res.send(`
    <html>
      <head>
        <title>API Documentation</title>
      </head>
      <body style="font-family: Arial; max-width: 900px; margin: 40px auto;">
        ${htmlContent}
      </body>
    </html>
  `);
});

module.exports = router;
