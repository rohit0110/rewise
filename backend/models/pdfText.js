const mongoose = require("mongoose");

const pdfTextSchema = new mongoose.Schema({
    title: String,
    tags: [String],
    text: String,
    flashcards: [
        {
            question: String,
            answer: String,
        }
    ],
    mcqs: [
        {
            question: String,
            options: [String],
            answer: String,
        }
    ],
    filePath: String,
  });
  

const PdfText = mongoose.model("PdfText", pdfTextSchema);

module.exports = { PdfText };
