# Rewise – Smart Revision App 🧠

An AI-powered flashcard + resource-based revision system, built to solve the problem of forgetting what you learn over time. Upload resources (PDFs for now), auto-extract their content, and tag them for smart, tag-based revision.

---

## ✅ Current Features (POC Stage)

- 📂 Upload PDFs from frontend and extract text using `pdf-parse`
- 🧠 Store original PDF locally (will move to blob storage later)
- 🗃️ Store extracted text + metadata (title, multiple tags) in MongoDB
- 🔖 Search and retrieve uploaded content by tags (`GET /api/revision/by-tag/:tag`)
- 🚀 React frontend for uploading and tag-based document search
- 🐳 Dockerized MongoDB for local development

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

## Future Improvements
✅ Support multiple tag search (/by-tags?tags=AI,ML)

📄 Accept more file types (PPTs, DOCX, images with OCR)

🧠 Integrate LLM (e.g. DeepSeek) to auto-generate flashcards

🔐 Reintroduce user authentication for private notes/revisions

☁️ Store PDFs in cloud storage (e.g. AWS S3, Cloudinary)

🏷️ Users can add notes to shared/common topics

📅 Add spaced repetition & revision history tracking