// frontend/src/components/byTag.js
import React, { useState } from "react";
import axios from "axios";

export default function ByTag() {
  const [tag, setTag] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchByTag = async () => {
    if (!tag) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/api/revision/by-tag/${tag}`);
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching docs by tag:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Search by Tag</h2>
      <input
        type="text"
        placeholder="Enter tag (e.g. Networking)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="border px-2 py-1 mr-2 rounded"
      />
      <button onClick={fetchByTag} className="bg-blue-500 text-white px-3 py-1 rounded">
        Search
      </button>

      {loading && <p className="mt-2">Loading...</p>}

      <div className="mt-4">
        {results.length === 0 && !loading ? (
          <p>No results yet</p>
        ) : (
          results.map((doc, idx) => (
            <div key={idx} className="border p-4 rounded mb-4 shadow-sm bg-white">
              <h3 className="font-bold text-gray-800 mb-1">Document #{idx + 1}</h3>
              <p className="text-sm text-gray-600">
  {doc.text ? `${doc.text.slice(0, 300)}...` : "No text available"}
</p>
              <p className="text-xs text-gray-500 mb-2">Tags: {doc.tags.join(", ")}</p>

              {/* Flashcards Section */}
              {doc.flashcards?.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-800 mb-1">Flashcards:</h4>
                  <ul className="list-disc ml-6 text-sm text-gray-700">
                    {doc.flashcards.map((fc, i) => (
                      <li key={i} className="mb-2">
                        <p><strong>Q:</strong> {fc.question}</p>
                        <p><strong>A:</strong> {fc.answer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
