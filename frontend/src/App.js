// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import FlashcardPage from './pages/FlashcardPage';
import UploadPage from './pages/UploadPage';
import RevisionPage from './pages/RevisionPage';
import './output.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/revision" element={<RevisionPage />} />
      </Routes>
    </Router>
  );
}

export default App;