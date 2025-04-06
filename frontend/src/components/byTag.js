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
            <div key={idx} className="border p-2 rounded mb-2">
              <h3 className="font-bold text-gray-800">Document #{idx + 1}</h3>
              <p className="text-sm text-gray-600">{doc.text.slice(0, 300)}...</p>
              <p className="text-xs text-gray-500">Tags: {doc.tags.join(", ")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
