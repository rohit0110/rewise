const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { PdfText } = require("../models/pdfText.js");
const { generateFlashcard } = require("../services/llmService");

const router = express.Router();

// 🗂️ Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 📤 POST /api/upload/pdf
router.post("/", upload.single("pdf"), async (req, res) => {
  const file = req.file;
  // const tags = req.body.tags?.split(',').map(tag => tag.trim()) || [];
  let tags = [];
  try {
    tags = JSON.parse(req.body.tags);
    if (!Array.isArray(tags)) throw new Error();
  } catch {
    return res.status(400).json({ error: "Invalid tags format. Must be a JSON array." });
  }

  if (!file) return res.status(400).json({ error: "No file uploaded" });

  const fileBuffer = fs.readFileSync(file.path);

  try {
    const data = await pdfParse(fileBuffer);
    const extractedText = data.text;
    const title = file.originalname;
    const pdfPath = file.path;

    console.log("Extracted text:", extractedText);
    // ✅ Generate flashcards directly as JSON
    const flashcards = await generateFlashcard(extractedText);
    console.log("Generated flashcards:", flashcards);
    const newDoc = new PdfText({
      title,
      tags,
      extractedText,
      flashcards,
      filePath: pdfPath,
    });

    await newDoc.save();

    res.status(201).json({ message: "PDF processed and flashcards saved!", document: newDoc });
  } catch (err) {
    console.error("Error parsing PDF or generating flashcards:", err);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

module.exports = router;
