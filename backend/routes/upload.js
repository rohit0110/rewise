const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const { PdfText } = require("../models/pdfText.js");

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
    const tags = req.body.tags?.split(',').map(tag => tag.trim()) || [];
  
    if (!file) return res.status(400).json({ error: "No file uploaded" });
  
    const fileBuffer = fs.readFileSync(file.path);
  
    try {
      const data = await pdfParse(fileBuffer);
      const extractedText = data.text;
  
      const savedDoc = new PdfText({
        filename: file.originalname,
        text: extractedText,
        tags: tags
      });
  
      await savedDoc.save();
      res.status(200).json({ message: "Upload successful", doc: savedDoc });
    } catch (err) {
      console.error("Error parsing PDF:", err);
      res.status(500).json({ error: "Failed to parse and save PDF" });
    }
  });
  

module.exports = router;
