import React from "react";
import UploadForm from "./components/uploadForm";
import ByTag from "./components/byTag";

function App() {
  return (
    <div className="App">
      <h1>Rewise – Smart Revision App</h1>
      <UploadForm />
      <hr />
      <ByTag />
    </div>
  );
}

export default App;
