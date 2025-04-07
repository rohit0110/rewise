const express = require("express");
const { PdfText } = require("../models/pdfText.js"); 
const { generateFlashcard } = require("../services/llmService");

const router = express.Router();

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
