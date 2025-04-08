import React, { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTagAdd = () => {
    if (inputTag.trim() && !tags.includes(inputTag)) {
      setTags([...tags, inputTag.trim()]);
      setInputTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("tags", JSON.stringify(tags));


    try {
      const res = await axios.post("http://localhost:3001/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from server:", res.data);
      alert("Upload successful!");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 underline mb-8">
          Upload File
        </h1>

        {/* File Upload */}
        <div className="mb-8">
          <label
            htmlFor="file-upload"
            className="block w-full cursor-pointer border-2 border-dashed border-blue-400 hover:border-blue-600 text-blue-500 rounded-lg px-6 py-10 text-center transition duration-200"
          >
            <p className="text-base font-medium">
              Click here to choose a PDF file
            </p>
            <p className="text-sm mt-2 text-gray-500">
              {file ? `Selected: ${file.name}` : 'No file selected'}
            </p>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Tag Input */}
        <div className="mb-4 px-2">
          <label className="block text-gray-700 font-semibold mb-2">Add Tags:</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              placeholder="e.g. OS, Database"
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>

          {/* Display Tags */}
          <div className="flex flex-wrap gap-2 justify-start mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-1 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
