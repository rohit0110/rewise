// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import flashCardsReducer from './store/FlashcardSlice';

const store = configureStore({
  reducer: {
    flashCards: flashCardsReducer,
  },
});

export default store;
