import { createSlice } from '@reduxjs/toolkit';


const shuffleTilesArray = () => {
  const tiles = Array.from({ length: 15 }, (_, i) => i + 1);
  tiles.push(null);
  

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  
  return tiles;
};

// Проверка возможности хода
const canMove = (index, emptyIndex) => {
  const row = Math.floor(index / 4);
  const col = index % 4;
  const emptyRow = Math.floor(emptyIndex / 4);
  const emptyCol = emptyIndex % 4;
  
  return (
    (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
    (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  );
};

// Проверка решения
const checkSolved = (tiles) => {
  for (let i = 0; i < 15; i++) {
    if (tiles[i] !== i + 1) {
      return false;
    }
  }
  return tiles[15] === null;
};

const initialState = {
  tiles: shuffleTilesArray(),
  emptyIndex: 15,
  moves: 0,
  isSolved: false
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Инициализация игры
    initializeGame: (state) => {
      const shuffled = shuffleTilesArray();
      state.tiles = shuffled;
      state.emptyIndex = shuffled.indexOf(null);
      state.moves = 0;
      state.isSolved = false;
    },
    
    // Перемещение плитки
    moveTile: (state, action) => {
      const index = action.payload;
      if (canMove(index, state.emptyIndex)) {
        // Меняем местами плитку и пустую клетку
        [state.tiles[state.emptyIndex], state.tiles[index]] = 
        [state.tiles[index], state.tiles[state.emptyIndex]];
        
        state.emptyIndex = index;
        state.moves += 1;
        state.isSolved = checkSolved(state.tiles);
      }
    },
    
    // Перемешивание плиток
    shuffleTiles: (state) => {
      const shuffled = shuffleTilesArray();
      state.tiles = shuffled;
      state.emptyIndex = shuffled.indexOf(null);
      state.moves = 0;
      state.isSolved = false;
    },
    
    // Сброс игры (упорядоченное состояние)
    resetGame: (state) => {
      state.tiles = Array.from({ length: 15 }, (_, i) => i + 1);
      state.tiles.push(null);
      state.emptyIndex = 15;
      state.moves = 0;
      state.isSolved = false;
    }
  }
});

// Экспортируем actions и reducer
export const { initializeGame, moveTile, shuffleTiles, resetGame } = gameSlice.actions;
export default gameSlice.reducer;