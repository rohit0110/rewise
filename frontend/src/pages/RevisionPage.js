import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RevisionHomePage() {
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    // Fetch all unique tags from backend
    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/revision/tags");
        setAllTags(res.data.tags || []);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    // Fetch all PDFs that match selected tags
    const fetchPdfsByTags = async () => {
      if (selectedTags.length === 0) {
        setPdfs([]);
        return;
      }

      try {
        const responses = await Promise.all(
          selectedTags.map((tag) =>
            axios.get(`http://localhost:3001/api/revision/by-tag/${tag}`)
          )
        );

        const allDocs = responses.flatMap((res) => res.data);
        // De-duplicate by _id
        const unique = new Map(allDocs.map((doc) => [doc._id, doc]));
        setPdfs(Array.from(unique.values()));
      } catch (err) {
        console.error("Error fetching PDFs by tags:", err);
      }
    };

    fetchPdfsByTags();
  }, [selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 underline mb-6">Start Revision</h1>

      {/* Tag Selection */}
      <div className="mb-6 w-full max-w-xl">
        <p className="font-semibold mb-2">Select Tags:</p>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full border ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* PDF Preview */}
      <div className="mb-8 w-full max-w-xl">
        <p className="font-semibold mb-2">Associated PDFs:</p>
        {pdfs.length === 0 ? (
          <p className="text-gray-500">No PDFs for selected tags</p>
        ) : (
          <ul className="list-disc list-inside bg-white p-4 rounded-xl shadow">
            {pdfs.map((pdf) => (
              <li key={pdf._id}>{pdf.title || pdf.filePath}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Proceed */}
      {pdfs.length > 0 && (
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          onClick={() => {
            console.log("Proceeding with PDFs:", pdfs.map((pdf) => pdf._id));
            // You can navigate here or pass PDF IDs to next page
          }}
        >
          Start Revision
        </button>
      )}
    </div>
  );
}
