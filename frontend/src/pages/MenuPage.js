import React from 'react';
import MenuCard from '../components/MenuCard';

export default function MenuPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md px-4 text-center">
        <h1 className="text-3xl font-bold mb-8">Rewise Menu</h1>
        <div className="flex flex-col gap-6">
        <MenuCard
            to="/revision"
            title="Revision"
            subtitle="Revise using your own documents"
            color="blue"
          />
          <MenuCard
            to="/flashcards"
            title="Flashcards"
            subtitle="Revise using interactive flashcards"
            color="blue"
          />
          <MenuCard
            to="/upload"
            title="Upload Documents"
            subtitle="Add notes, PDFs or slides for revision"
            color="green"
          />
          <MenuCard title="MCQ" subtitle="Coming Soon" comingSoon />
          <MenuCard title="Interview" subtitle="Coming Soon" comingSoon />
        </div>
      </div>
    </div>
  );
}
