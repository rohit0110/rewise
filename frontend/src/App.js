import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("pdf", e.target.files[0]);
  
    try {
      const res = await axios.post("http://localhost:3001/api/upload/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };
  
  return (
    <div className="App">
      <h1>PDF Upload</h1>
      <input type="file" accept=".pdf" onChange={handleUpload} />
    </div>
  );
}

export default App;
