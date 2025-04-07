# Rewise – Smart Revision App 🧠

An AI-powered flashcard + resource-based revision system, built to solve the problem of forgetting what you learn over time. Upload resources (PDFs for now), auto-extract their content, and tag them for smart, tag-based revision.

---

## ✅ Current Features (POC Stage)

- 📂 Upload PDFs from frontend and extract text using `pdf-parse`
- 🧠 Store original PDF locally (will move to blob storage later)
- 🗃️ Store extracted text + metadata (title, multiple tags) in MongoDB
- 🤖 Automatically generate flashcards (Q&A) using local LLM (Gemma 2B via Ollama)
- 💾 Store flashcards in DB alongside extracted content
- 🔖 Search and retrieve uploaded content by tags (`GET /api/revision/by-tag/:tag`)
- 🚀 React frontend for uploading and tag-based document search
- 🐳 Dockerized MongoDB + LLM (Ollama) for local development

---

## 🚀 How to Run

```bash
# 1. Start MongoDB
docker-compose up -d

# 2. Start backend
cd backend
npm install
npm run dev

# 3. Start frontend
cd frontend
npm install
npm start

---
```

## Future Improvements
✅ Support multiple tag search (/by-tags?tags=AI,ML)

📝 Chunk Out uploaded data to LLM so that out of context lengths can be handled

📄 Accept more file types (PPTs, DOCX, images with OCR)

❓ Add support for MCQs and explanation-based QnA generation

🔐 Reintroduce user authentication for private notes/revisions

📦 Move PDF storage to cloud (AWS S3, Cloudinary, etc.)

📝 Users can add notes to shared/common topics

📅 Add spaced repetition & revision history tracking

📊 Analytics dashboard for revision stats

## Bugs/Issues
Not all PDFs are being text extracted from.
For Large PDFs, sometimes Flashcards are not generating
Long runtime for upload function.
