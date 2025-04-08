import React from 'react';
import UploadForm from '../components/uploadForm';

export default function UploadPage() {
  return (
    <div className="p-4 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">📤 Upload Notes</h2>
      <UploadForm />
    </div>
  );
}
