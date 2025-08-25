import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './Slice';

export const store = configureStore({
  reducer: {
    game: gameSlice,
  },
});