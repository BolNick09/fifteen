import React from 'react';

const Cell = ({ value, onClick, isClickable }) => {
  const getBackgroundColor = () => {
    if (value === null) return '#2c3e50'; // Пустая клетка
    return '#3498db'; // Обычная клетка
  };

  const getHoverColor = () => {
    if (value === null) return '#2c3e50';
    return '#2980b9';
  };

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      style={{
        width: '60px',
        height: '60px',
        margin: '4px',
        fontSize: '24px',
        fontWeight: 'bold',
        backgroundColor: getBackgroundColor(),
        color: 'white',
        border: '2px solid #2c3e50',
        borderRadius: '8px',
        cursor: isClickable ? 'pointer' : 'default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        
        // hover эффекты через JavaScript
        ...(isClickable && {
          ':hover': {
            backgroundColor: getHoverColor(),
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
          }
        }),
        
        // active эффект
        ...(isClickable && {
          ':active': {
            transform: 'translateY(0)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }
        })
      }}
      
      // Для hover эффектов в React лучше использовать onMouseEnter/onMouseLeave
      onMouseEnter={(e) => {
        if (isClickable && value !== null) {
          e.target.style.backgroundColor = getHoverColor();
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
        }
      }}
      
      onMouseLeave={(e) => {
        if (isClickable && value !== null) {
          e.target.style.backgroundColor = getBackgroundColor();
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        }
      }}
    >
      {value !== null ? value : ''}
    </button>
  );
};

export default Cell;