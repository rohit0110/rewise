// src/store/flashCardsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const flashCards = createSlice({
  name: 'flashCards',
  initialState: {
    current: 0,
    flipped: false,
    cards: [
      {
        id: 0,
        front: {
          title: 'Question 1',
          content: 'What is Redux Toolkit? (click anywhere on the card to flip)',
        },
        back: {
          title: '',
          content:
            'Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development and is intended to be the standard way to write Redux logic.',
        },
      },
      {
        id: 1,
        front: {
          title: 'About This Project',
          content:
            'This project was built with React, React-Router, Redux, Redux Toolkit, React-Redux & a Custom Designed MaterialUI Theme',
        },
        back: {
          title: 'More info',
          content:
            'Click the GitHub icon in the top right of the screen to view the source code!',
        },
      },
    ],
  },
  reducers: {
    nextFlashCard: (state) => {
      if (state.current < state.cards.length - 1) {
        if (state.flipped) flashCards.caseReducers.flipFlashCard(state);
        state.current++;
      }
    },
    prevFlashCard: (state) => {
      if (state.current !== 0) {
        if (state.flipped) flashCards.caseReducers.flipFlashCard(state);
        state.current--;
      }
    },
    flipFlashCard: (state) => {
      state.flipped = !state.flipped;
    },
    createFlashCard: (state, action) => {
      action.payload.id = state.cards.length + 1;
      state.cards.push(action.payload);
      state.current = state.cards.length - 1;
    },
    updateFlashCard: (state, action) => {
      const { index, updatedCardInfo } = action.payload;
      state.cards[index] = updatedCardInfo;
    },
    deleteFlashCard: (state) => {
      if (state.cards.length === 1) return;
      if (!state.flipped) flashCards.caseReducers.flipFlashCard(state);
      if (state.cards.length - 1 === state.current) {
        state.current--;
        state.cards.splice(state.current + 1, 1);
      } else {
        state.cards.splice(state.current, 1);
      }
    },
  },
});

export const {
  nextFlashCard,
  prevFlashCard,
  flipFlashCard,
  createFlashCard,
  updateFlashCard,
  deleteFlashCard,
} = flashCards.actions;

export default flashCards.reducer;
