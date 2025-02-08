import React from 'react';

function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default Button;
