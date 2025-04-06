const express = require("express");
const { PdfText } = require("../models/pdfText.js"); 

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

module.exports = router;
