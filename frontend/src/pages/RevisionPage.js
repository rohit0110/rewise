import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RevisionHomePage() {
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [allPdfs, setAllPdfs] = useState([]);
  const [selectedPdfIds, setSelectedPdfIds] = useState([]);
  const [selectionMode, setSelectionMode] = useState("tags"); // "tags" or "pdfs"

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
    
    // Fetch all available PDFs for direct selection
    const fetchAllPdfs = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/revision/headings");
        setAllPdfs(res.data.headings || []);
      } catch (err) {
        console.error("Failed to fetch PDFs:", err);
      }
    };
    
    fetchTags();
    fetchAllPdfs();
  }, []);

  useEffect(() => {
    // Fetch all PDFs that match selected tags (only when in tags mode)
    const fetchPdfsByTags = async () => {
      if (selectionMode !== "tags" || selectedTags.length === 0) {
        if (selectionMode === "tags") {
          setPdfs([]);
        }
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
  }, [selectedTags, selectionMode]);

  useEffect(() => {
    // When in PDF selection mode, set pdfs based on selected PDF IDs
    if (selectionMode === "pdfs") {
      // Convert selected PDF IDs to the format expected by the rest of the app
      const selectedPdfsList = selectedPdfIds.map(id => {
        const pdfInfo = allPdfs.find(pdf => pdf.id === id);
        return {
          _id: id,
          title: pdfInfo?.title || "Unknown",
          // Adding a placeholder for filePath in case it's needed elsewhere
          filePath: pdfInfo?.title || "Unknown"
        };
      });
      setPdfs(selectedPdfsList);
    }
  }, [selectedPdfIds, selectionMode, allPdfs]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const togglePdf = (pdfId) => {
    setSelectedPdfIds((prev) =>
      prev.includes(pdfId) ? prev.filter((id) => id !== pdfId) : [...prev, pdfId]
    );
  };

  const changeSelectionMode = (mode) => {
    setSelectionMode(mode);
    // Clear selected items when switching modes
    if (mode === "tags") {
      setSelectedPdfIds([]);
    } else {
      setSelectedTags([]);
      setPdfs([]);
    }
  };

  const handleStartRevision = () => {
    // For tag mode: using existing _id values
    // For pdf mode: using the selected ids from the headings
    const selectedIds = selectionMode === "tags" 
      ? pdfs.map((pdf) => pdf._id)
      : selectedPdfIds;
      
    console.log("Proceeding with PDFs:", selectedIds);
    // Navigate or pass PDF IDs to next page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 underline mb-6">Start Revision</h1>

      {/* Selection Mode Toggle */}
      <div className="mb-6 w-full max-w-xl">
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => changeSelectionMode("tags")}
            className={`px-4 py-2 rounded-md ${
              selectionMode === "tags"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Select by Tags
          </button>
          <button
            onClick={() => changeSelectionMode("pdfs")}
            className={`px-4 py-2 rounded-md ${
              selectionMode === "pdfs"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Select by PDF Title
          </button>
        </div>
      </div>

      {/* Tag Selection (shown when in tags mode) */}
      {selectionMode === "tags" && (
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
      )}

      {/* PDF Title Selection (shown when in pdfs mode) */}
      {selectionMode === "pdfs" && (
        <div className="mb-6 w-full max-w-xl">
          <p className="font-semibold mb-2">Select PDFs:</p>
          <div className="bg-white p-4 rounded-xl shadow max-h-64 overflow-y-auto">
            {allPdfs.length === 0 ? (
              <p className="text-gray-500">Loading PDFs...</p>
            ) : (
              <ul className="space-y-2">
                {allPdfs.map((pdf) => (
                  <li key={pdf.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`pdf-${pdf.id}`}
                      checked={selectedPdfIds.includes(pdf.id)}
                      onChange={() => togglePdf(pdf.id)}
                      className="mr-2 h-4 w-4"
                    />
                    <label htmlFor={`pdf-${pdf.id}`} className="cursor-pointer">
                      {pdf.title}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* PDF Preview */}
      <div className="mb-8 w-full max-w-xl">
        <p className="font-semibold mb-2">
          {selectionMode === "tags" ? "Associated PDFs:" : "Selected PDFs:"}
        </p>
        {pdfs.length === 0 ? (
          <p className="text-gray-500">
            {selectionMode === "tags" 
              ? "No PDFs for selected tags" 
              : "No PDFs selected"
            }
          </p>
        ) : (
          <ul className="list-disc list-inside bg-white p-4 rounded-xl shadow">
            {pdfs.map((pdf) => (
              <li key={selectionMode === "tags" ? pdf._id : pdf._id}>
                {pdf.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Proceed */}
      {pdfs.length > 0 && (
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          onClick={handleStartRevision}
        >
          Start Revision
        </button>
      )}
    </div>
  );
}