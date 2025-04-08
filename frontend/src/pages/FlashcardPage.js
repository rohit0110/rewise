// src/pages/FlashcardPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextFlashCard, prevFlashCard, flipFlashCard } from '../store/flashcardSlice';

export default function FlashcardPage() {
  const dispatch = useDispatch();
  const { current, flipped, cards } = useSelector((state) => state.flashCards);

  if (cards.length === 0) return <p className="text-center">No flashcards available</p>;

  const card = cards[current];
  const side = flipped ? card.back : card.front;

  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      <div
        onClick={() => dispatch(flipFlashCard())}
        className="w-96 h-60 bg-white rounded-2xl shadow-xl p-6 cursor-pointer flex flex-col justify-center items-center text-center"
      >
        <h2 className="text-xl font-bold mb-2">{side.title}</h2>
        <p className="text-base font-medium">{side.content}</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(prevFlashCard())}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => dispatch(nextFlashCard())}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
