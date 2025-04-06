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
router.post("/pdf", upload.single("pdf"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // Save both original filename + text
    const savedDoc = new PdfText({
      filename: req.file.originalname,
      text: pdfData.text,
    });
    await savedDoc.save();
    console.log("PDF parsed and saved:", savedDoc);
    res.json({ message: "PDF uploaded and processed", data: savedDoc });
  } catch (err) {
    console.error("Error parsing PDF:", err);
    res.status(500).json({ error: "Failed to parse PDF" });
  }
});

module.exports = router;
