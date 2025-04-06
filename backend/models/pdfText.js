const mongoose = require("mongoose");

const PdfTextSchema = new mongoose.Schema({
  filename: String,
  text: String,
  uploadedAt: { type: Date, default: Date.now },
});

const PdfText = mongoose.model("PdfText", PdfTextSchema);

module.exports = { PdfText };
