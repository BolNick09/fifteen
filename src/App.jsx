import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Cell from './components/Cell/Cell';
import { initializeGame, moveTile, shuffleTiles } from './store/Slice';

function App() 
{
  const dispatch = useDispatch();
  const { tiles, moves, isSolved } = useSelector((state) => state.game);

  useEffect(() => 
  {
    dispatch(initializeGame());
  }, [dispatch]);

  const handleCellClick = (index) => 
  {
    if (!isSolved) 
      dispatch(moveTile(index));
    
  };

  const handleShuffle = () => {
    dispatch(shuffleTiles());
  };

  const handleNewGame = () => {
    dispatch(initializeGame());
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Пятнашки</h1>
      
      {isSolved && (
        <div style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          margin: '15px 0',
          fontSize: '18px'
        }}>
          🎉 Поздравляем! Вы решили головоломку за {moves} ходов!
        </div>
      )}
      
      <div style={{ margin: '15px 0' }}>
        <span style={{ 
          fontSize: '20px', 
          fontWeight: 'bold',
          color: '#2c3e50'
        }}>
          Ходов: {moves}
        </span>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleShuffle}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '10px',
            fontWeight: 'bold'
          }}
        >
          🔀 Перемешать
        </button>
        
        <button 
          onClick={handleNewGame}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🆕 Новая игра
        </button>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 64px)',
        gap: '4px',
        margin: '20px auto',
        width: 'fit-content',
        backgroundColor: '#34495e',
        padding: '15px',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
      }}>
        {tiles.map((value, index) => (
          <Cell 
            key={index} 
            value={value} 
            onClick={() => handleCellClick(index)}
            isClickable={!isSolved && value !== null}
          />
        ))}
      </div>
      
      <div style={{ 
        marginTop: '20px',
        color: '#7f8c8d',
        fontSize: '14px'
      }}>
        Цель: расположить числа по порядку от 1 до 15
      </div>
    </div>
  );
}

export default App;