// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import flashCardsReducer from './store/flashcardSlice';

const store = configureStore({
  reducer: {
    flashCards: flashCardsReducer,
  },
});

export default store;
