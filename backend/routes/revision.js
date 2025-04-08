const express = require("express");
const { PdfText } = require("../models/pdfText.js"); 
const { generateFlashcard } = require("../services/llmService");

const router = express.Router();

// Fetch all documents with these tags
router.get("/by-tag/:tag", async (req, res) => {
  const tag = req.params.tag;

  try {
    const docs = await PdfText.find({ tags: tag });
    res.status(200).json(docs);
  } catch (err) {
    console.error("Error fetching documents by tag:", err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// GET /api/tags - Return all unique tags
router.get("/tags", async (req, res) => {
  try {
    const docs = await PdfText.find({}, "tags");
    const allTags = docs.flatMap(doc => doc.tags || []);
    const uniqueTags = [...new Set(allTags)];
    res.json({ tags: uniqueTags });
  } catch (err) {
    console.error("Failed to fetch tags:", err);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

// 📄 GET /api/revision/headings - Get all PDF titles with their _id
router.get("/headings", async (req, res) => {
  try {
    const docs = await PdfText.find({}, "title");
    const headings = docs.map(doc => ({
      id: doc._id,
      title: doc.title,
    }));
    res.status(200).json({ headings });
  } catch (err) {
    console.error("Failed to fetch headings:", err);
    res.status(500).json({ error: "Failed to fetch headings" });
  }
});


router.post("/generate-flashcard", async (req, res) => {
    const { extractedText } = req.body;
  
    if (!extractedText) {
      return res.status(400).json({ error: "No text provided" });
    }
  
    try {
      const result = await generateFlashcard(extractedText);
      res.json({ revision: result });
    } catch (err) {
      res.status(500).json({ error: "Failed to generate flashcards" });
    }
  });

router.get("/:id/questions", async (req, res) => {
    try {
    const doc = await PdfText.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });

    res.json({
        flashcards: doc.flashcards,
        mcqs: doc.mcqs,
    });
    } catch (err) {
    res.status(500).json({ error: "Server error" });
    }
});
  
module.exports = router;
