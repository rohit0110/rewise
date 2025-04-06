import React, { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("tags", tags);

    try {
      const res = await axios.post("http://localhost:3001/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      alert("Upload successful!");
    } catch (err) {
      console.log(err);
      console.error("Upload failed", err);
      alert("Upload failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file" 
        accept=".pdf" 
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input 
        type="text" 
        placeholder="Enter tags (comma-separated)" 
        value={tags} 
        onChange={(e) => setTags(e.target.value)} 
      />
      <button type="submit">Upload</button>
    </form>
  );
}
